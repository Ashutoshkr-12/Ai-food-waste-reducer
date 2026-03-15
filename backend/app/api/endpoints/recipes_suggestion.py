from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select
from app.config.db import get_db
from app.services.recipe_service import get_priority_items
from app.services.gemini.gemini_recipe import suggest_recipes

router = APIRouter()

@router.post("/suggest")
async def suggest_recipe(
    db: AsyncSession = Depends(get_db)
):
    try:

        user_id = 1 #TODO from user

        items = await get_priority_items(db,user_id)

        recipes = await suggest_recipes(items)

        return recipes

    except HTTPException as e:
        raise HTTPException(
            status_code=500,
            detail="unable to fetch items from gemini"
        )
    except SQLAlchemyError as e:
        raise e
            