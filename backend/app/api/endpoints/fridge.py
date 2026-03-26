from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from app.config.db import get_db
from app.models.fridge_items import FridgeItem
from app.schemas.fridge_schema import FridgeItemsCreate, FridgeItemResponse

from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user
from app.services.user_stats.stats_service import increase_items_added

router = APIRouter()

@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
)
async def save_items(
    data: FridgeItemsCreate,
    clerk = Depends(get_current_clerkUser),
    db: AsyncSession = Depends(get_db),
):
    try:

        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"],
            email=clerk["email"]
        )

        created = []

        for item in data.items:

            db_item = FridgeItem(
                user_id=user.id,
                name=item.name,
                quantity=item.quantity,
                expiry_date=item.expiry_date,
                source=item.source or "manual",
                scan_id=item.scan_id if item.scan_id else None,
                status="active",
                image_url=item.image_url,
            )

            db.add(db_item)
            created.append(db_item)
            
        await db.commit()

        await increase_items_added(
            db=db,
            user_id=user.id,
            count=len(created),
        )

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
    clerk=Depends(get_current_clerkUser),
):
    try:

        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"],
            email=clerk["email"],
        )

        result = await db.execute(
            select(FridgeItem).where(
                FridgeItem.user_id == user.id
            )
        )

        items = result.scalars().all()

        return items

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error fetching fridge items",
        )


