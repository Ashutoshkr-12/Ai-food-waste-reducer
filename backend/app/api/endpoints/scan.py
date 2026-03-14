from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.config.db import get_db
from app.models.scan_result import IngredientScan
from app.schemas.scan_schema import ScanCreate, ScanResponse

router = APIRouter()

@router.post("/", response_model=ScanResponse)
async def create_scan(
    data: ScanCreate,
    db: AsyncSession = Depends(get_db),
):
    try:

        #! gemini result (fake for now)
        detected = ["milk", "egg", "tomato"]

        scan = IngredientScan(
            user_id=1,
            image_url=data.image_url,
            scan_result=detected,
        )

        db.add(scan)
        await db.commit()
        await db.refresh(scan)

        return scan

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(500, "Scan failed")