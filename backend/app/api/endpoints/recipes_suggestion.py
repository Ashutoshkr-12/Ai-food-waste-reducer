from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from app.config.db import get_db
from app.services.recipe_service import get_priority_items
from app.services.gemini.gemini_recipe import suggest_recipes
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user
from app.services.user_stats.stats_service import increase_food_saved

router = APIRouter()

@router.post("/suggest")
async def suggest_recipe(
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser)
):
    try:
        user = await get_current_user(
            clerk_id=clerk["clerk_id"],
            email=clerk["email"],
            db=db,
        )

        items = await get_priority_items(db,user.id)

        recipes = await suggest_recipes(items)

        return recipes

    except HTTPException as e:
        raise HTTPException(
            status_code=500,
            detail="unable to fetch items from gemini"
        )
    except SQLAlchemyError as e:
        raise e
    
@router.post("/use")
async def use_recipe(
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser),
):

    user = await get_current_user(
        db=db,
        clerk_id=clerk["clerk_id"],
        email=clerk["email"],
    )

    await increase_food_saved(
        db=db,
        user_id=user.id,
        count=1,
    )

    return {"message": "recipe used"}
            