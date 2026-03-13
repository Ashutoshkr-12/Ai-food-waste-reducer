from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_db
from app.models.fridge_items import FridgeItem
from app.schemas.fridge_schema import FridgeItemCreate

router = APIRouter()


@router.post("/")
async def add_item(
    data: FridgeItemCreate,
    db: AsyncSession = Depends(get_db),
):
    item = FridgeItem(**data.dict())

    db.add(item)
    await db.commit()
    await db.refresh(item)

    return item


@router.get("/")
async def get_items(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        FridgeItem.__table__.select()
    )
    return result.fetchall()