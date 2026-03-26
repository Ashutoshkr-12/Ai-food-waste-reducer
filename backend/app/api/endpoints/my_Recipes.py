from fastapi import APIRouter,Depends,HTTPException
from app.config.db import get_db
from sqlalchemy import select
from app.models.community_recipe import CommunityRecipe
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user

router = APIRouter()

@router.get("/")
async def get_my_recipes(
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser),
):
    user = await get_current_user(
        clerk_id=clerk["clerk_id"],
        db=db,
    )

    result = await db.execute(
        select(CommunityRecipe).where(
            CommunityRecipe.user_id == user.id
        )
    )

    recipes = result.scalars().all()

    return recipes