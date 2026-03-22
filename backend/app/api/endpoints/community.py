from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select, desc

from app.config.db import get_db
from app.models.community_recipe import CommunityRecipe
from app.schemas.community_schema import (
    CommunityRecipeCreate,
    CommunityRecipeResponse,
)
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user

router = APIRouter()

@router.post(
    "/",
    response_model=CommunityRecipeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_recipe(
    data: CommunityRecipeCreate,
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser)
):
    try:
        user = await get_current_user(
            clerk_id=clerk["clerk_id"],
        )
        
        recipe = CommunityRecipe(
            **data.model_dump(),
            user_id=user.id,
            likes_count=0,
            comments_count=0,
        )

        db.add(recipe)
        await db.commit()
        await db.refresh(recipe)

        return recipe

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error while creating recipe",
        )

    except Exception:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )


@router.get(
    "/",
    response_model=list[CommunityRecipeResponse],
)
async def get_recipes(
    db: AsyncSession = Depends(get_db),
):
    try:

        result = await db.execute(
            select(CommunityRecipe).order_by(
                desc(CommunityRecipe.created_at)
            )
        )

        recipes = result.scalars().all()

        return recipes

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Database error while fetching recipes",
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )