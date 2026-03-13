from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_db
from app.models.recipe_likes import RecipeLike

router = APIRouter()


@router.post("/")
async def like_recipe(
    user_id: int,
    recipe_id: int,
    db: AsyncSession = Depends(get_db),
):
    like = RecipeLike(
        user_id=user_id,
        recipe_id=recipe_id,
    )

    db.add(like)
    await db.commit()

    return {"message": "liked"}