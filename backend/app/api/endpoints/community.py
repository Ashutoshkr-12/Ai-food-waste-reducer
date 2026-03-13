from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_db
from app.models.community_recipe import CommunityRecipe
from app.schemas.community_schema import CommunityRecipeCreate

router = APIRouter()


@router.post("/")
async def create_recipe(
    data: CommunityRecipeCreate,
    db: AsyncSession = Depends(get_db),
):
    recipe = CommunityRecipe(**data.dict())

    db.add(recipe)
    await db.commit()
    await db.refresh(recipe)

    return recipe


@router.get("/")
async def get_recipes(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        CommunityRecipe.__table__.select()
    )
    return result.fetchall()