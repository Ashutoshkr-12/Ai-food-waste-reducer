from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.services.roboflow.detection import detect_food_items
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from app.config.db import get_db
from app.models.scan_result import IngredientScan
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user
from app.services.gemini.gemini_expiry import get_expiry_dates
from app.services.spooncular.spooncular import get_food_image
router = APIRouter()

@router.post("/")
async def detect_food(
    file: UploadFile = File(...),
    db: AsyncSession =Depends(get_db),
    clerk=Depends(get_current_clerkUser)
):
    try:
        image_bytes = await file.read()

        detected_items = await detect_food_items(image_bytes, file.filename)
    
        if not detected_items["detections"]:
            raise HTTPException(
                status_code=400,
                detail="No items detected please try again",
            )
        items_name = [d["item"] for d in detected_items["detections"]]
        expiry_data = await get_expiry_dates(items_name)

        expiry_map = {
            e["item"]: e["days"]
            for e in expiry_data
        }

        for d in detected_items["detections"]:
            name = d["item"]
            img = await get_food_image(name)
            days = expiry_map.get(name, 3)
            d["image_url"] = img
            d["expiry_days"] = days


        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"]
        )
        
        scan = IngredientScan(
            user_id=user.id,
            image_url=file.filename,
            scan_result=detected_items,
        )

        db.add(scan)
        await db.commit()
        await db.refresh(scan)

        return scan

    except HTTPException:
        raise
    except SQLAlchemyError as e:
        await db.rollback()
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Database error during scan",
        )


    except Exception as e:
        await db.rollback()
        print(e)
        raise HTTPException(
            status_code=500,
            detail=str(e), 
        )