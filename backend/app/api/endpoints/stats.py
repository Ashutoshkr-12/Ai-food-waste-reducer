from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from app.config.db import get_db
from app.models.user_stats import UserStats
from app.schemas.stats_schema import UserStatsResponse
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user 

router = APIRouter()

@router.post("/use")
async def use_recipe(
    db: AsyncSession=Depends(get_db),
    clerk=Depends(get_current_clerkUser)
):
    try:
        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"]
        )
     
    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error fetching stats",
        )

@router.get("/me",response_model=UserStatsResponse)
async def get_stats(
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser),
):
    try:
        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"]
        )

        result = await db.execute(
            select(UserStats).where(
                UserStats.user_id == user.id
            )
        )

        stats = result.scalar_one_or_none()

        if not stats:
            raise HTTPException(
                status_code=404,
                detail="Stats not found",
            )

        return stats

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error fetching stats",
        )
    
@router.get("/{user_id}")
async def get_user_stats(
    user_id: int,
    db: AsyncSession = Depends(get_db),
):
    stats = await db.get(UserStats, user_id)

    if not stats:
        raise HTTPException(404, "Stats not found")

    return stats