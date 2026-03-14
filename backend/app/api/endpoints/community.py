from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from app.config.db import get_db
from app.models.community_recipe import CommunityRecipe
from app.schemas.community_schema import (
    CommunityRecipeCreate,
    CommunityRecipeResponse,
)

router = APIRouter()

#* create community recipe
@router.post(
    "/",
    response_model=CommunityRecipeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_recipe(
    data: CommunityRecipeCreate,
    db: AsyncSession = Depends(get_db),
):
    try:

        recipe = CommunityRecipe(
            **data.model_dump(),
        )

        db.add(recipe)
        await db.commit()
        await db.refresh(recipe)

        return recipe

    except HTTPException as e:
        await db.rollback()
        raise e

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error while creating recipe",
        )

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )

#* Get all
@router.get(
    "/",
    response_model=list[CommunityRecipeResponse],
)
async def get_recipes(
    db: AsyncSession = Depends(get_db),
):
    try:

        result = await db.execute(
            select(CommunityRecipe)
        )

        recipes = result.scalars().all()

        return recipes

    except HTTPException as e:
        raise e

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