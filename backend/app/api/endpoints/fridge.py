from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from app.config.db import get_db
from app.models.fridge_items import FridgeItem
from app.schemas.fridge_schema import (
    FridgeItemCreate,
    FridgeItemsCreate,
    FridgeItemResponse,
)

router = APIRouter()


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
)
async def save_items(
    data: FridgeItemsCreate,
    db: AsyncSession = Depends(get_db),
):
    try:

        user_id = 1  # TODO: from auth

        created = []

        for item in data.items:

            db_item = FridgeItem(
                user_id=user_id,
                name=item.name,
                quantity=item.quantity,
                expiry_date=item.expiry_date,
                source="scan",
                status="active",
            )

            db.add(db_item)
            created.append(db_item)

        await db.commit()

        return {
            "message": "Items saved",
            "count": len(created),
        }

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error while saving items",
        )

    except Exception as e:
        await db.rollback()
        print(e)

        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )


@router.get(
    "/",
    response_model=list[FridgeItemResponse],
)
async def get_items(
    db: AsyncSession = Depends(get_db),
):
    try:

        user_id = 1  # TODO: from auth

        result = await db.execute(
            select(FridgeItem).where(
                FridgeItem.user_id == user_id
            )
        )

        items = result.scalars().all()

        return items

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error fetching fridge items",
        )