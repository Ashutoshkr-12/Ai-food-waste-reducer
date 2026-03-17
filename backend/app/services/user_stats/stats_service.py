from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user_stats import UserStats


async def get_stats(db: AsyncSession, user_id: int):

    result = await db.execute(
        select(UserStats).where(
            UserStats.user_id == user_id
        )
    )

    return result.scalar_one()


async def increase_items_added(
    db: AsyncSession,
    user_id: int,
    count: int = 1,
):

    stats = await get_stats(db, user_id)

    stats.items_added += count

    await db.commit()


async def increase_food_saved(
    db: AsyncSession,
    user_id: int,
    count: int = 1,
):

    stats = await get_stats(db, user_id)

    stats.food_saved += count

    await db.commit()


async def increase_waste_reduced(
    db: AsyncSession,
    user_id: int,
    count: int = 1,
):

    stats = await get_stats(db, user_id)

    stats.waste_reduced += count

    await db.commit()