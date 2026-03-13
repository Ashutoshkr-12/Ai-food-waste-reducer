from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_db
from app.models.user_stats import UserStats

router = APIRouter()


@router.get("/{user_id}")
async def get_stats(
    user_id: int,
    db: AsyncSession = Depends(get_db),
):
    return await db.get(UserStats, user_id)