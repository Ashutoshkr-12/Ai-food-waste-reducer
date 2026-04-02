from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
import asyncio

from app.config.db import get_db
from app.services.recipe_service import get_priority_items
from app.services.gemini.gemini_recipe import suggest_recipes
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user
from app.services.user_stats.stats_service import increase_food_saved
from app.services.unsplash.unsplash import fetch_image

router = APIRouter()

FALLBACK_IMAGE = "https://yourcdn.com/default-food.jpg"


@router.post("/suggest")
async def suggest_recipe(
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser)
):
    try:
        user = await get_current_user(
            clerk_id=clerk["clerk_id"],
            db=db,
        )

        items = await get_priority_items(db, user.id)

        if not items:
            raise HTTPException(status_code=400, detail="No ingredients found")

        recipes = await suggest_recipes(items)

        if not recipes or not isinstance(recipes, list):
            raise HTTPException(status_code=500, detail="Invalid Gemini response")

        valid_recipes = []
        for r in recipes:
            if not isinstance(r, dict):
                continue
            if not r.get("title"):
                continue

            r.setdefault("ingredients", [])
            r.setdefault("steps", [])
            r.setdefault("time_minutes", 0)

            valid_recipes.append(r)

        if not valid_recipes:
            raise HTTPException(status_code=500, detail="No valid recipes generated")

        async def get_image(recipe):
            query = recipe.get("search_query") or recipe["title"]

            try:
                image = await asyncio.to_thread(fetch_image, query)
                return image or FALLBACK_IMAGE
            except Exception:
                return FALLBACK_IMAGE

        images = await asyncio.gather(
            *[get_image(r) for r in valid_recipes]
        )
        for recipe, img in zip(valid_recipes, images):
            recipe["image_url"] = img

        return valid_recipes

    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/use")
async def use_recipe(
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser),
):
    try:
        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"],
        )

        await increase_food_saved(
            db=db,
            user_id=user.id,
            count=1,
        )

        return {"message": "recipe used"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))