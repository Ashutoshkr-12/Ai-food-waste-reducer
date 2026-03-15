from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.config.db import get_db
from app.models.scan_result import IngredientScan
from app.schemas.scan_schema import ScanResponse

from app.services.gemini.gemini_scan import detect_items

router = APIRouter()


@router.post("/", response_model=ScanResponse)
async def create_scan(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    try:

        image_bytes = await file.read()

        detected_items = await detect_items(
            image_bytes
        )

        if not detected_items:
            raise HTTPException(
                status_code=400,
                detail="No items detected",
            )

        user_id = 1  # TODO auth later

        scan = IngredientScan(
            user_id=user_id,
            image_url= file.filename,
            scan_result=detected_items,
        )

        db.add(scan)
        await db.commit()
        await db.refresh(scan)

        return scan

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Scan failed",
        )

    except Exception as e:
        await db.rollback()
        print(e)

        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )