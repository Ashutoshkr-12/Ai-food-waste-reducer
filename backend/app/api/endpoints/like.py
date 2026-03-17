from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from sqlalchemy.exc import SQLAlchemyError

from app.config.db import get_db
from app.models.recipe_likes import RecipeLike
from app.models.community_recipe import CommunityRecipe
from app.schemas.like_schema import LikeCreate
from app.services.auth.user_service import get_current_user
from app.services.auth.clerk_auth import get_current_clerkUser


router = APIRouter()

@router.post("/")
async def like_recipe(
    data: LikeCreate,
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser),
):
    try:

        user = await get_current_user(
            clerk_id=clerk["clerk_id"],
            email=clerk["email"]
        )

        # check recipe exists
        recipe_result = await db.execute(
            select(CommunityRecipe).where(
                CommunityRecipe.id == data.recipe_id
            )
        )

        recipe = recipe_result.scalar_one_or_none()

        if not recipe:
            raise HTTPException(
                status_code=404,
                detail="Recipe not found",
            )

        # check already liked
        result = await db.execute(
            select(RecipeLike).where(
                RecipeLike.user_id == user.id,
                RecipeLike.recipe_id == data.recipe_id,
            )
        )

        existing_like = result.scalar_one_or_none()

        if existing_like:
            raise HTTPException(
                status_code=400,
                detail="Already liked",
            )

        like = RecipeLike(
            user_id=user.id,
            recipe_id=data.recipe_id,
        )

        db.add(like)

        # increase count
        recipe.likes_count += 1

        await db.commit()

        return {
            "message": "Liked",
            "likes_count": recipe.likes_count,
        }

    except HTTPException:
        raise

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error",
        )

    except Exception:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )