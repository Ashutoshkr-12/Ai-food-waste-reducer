from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.config.db import get_db
from app.models.user_stats import UserStats

router = APIRouter()


@router.get("/{user_id}")
async def get_stats(
    user_id: int,
    db: AsyncSession = Depends(get_db),
):
    try:

        stats = await db.get(UserStats, user_id)

        if not stats:
            raise HTTPException(
                status_code=404,
                detail="stats not found"
            )
        return stats
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail= getattr(e," error in fetching user stats")
        )