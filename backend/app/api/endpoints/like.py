from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from app.config.db import get_db
from app.models.recipe_likes import RecipeLike
from app.schemas.like_schema import LikeCreate
router = APIRouter()


@router.post("/")
async def like_recipe(
    data: LikeCreate,
    db: AsyncSession = Depends(get_db),
):
    try:
        result = await db.execute(
            select(RecipeLike).where(
                RecipeLike.user_id == data.user_id,
                RecipeLike.recipe_id == data.recipe_id,
            )
        )
        existingLike = result.scalar_one_or_none()

        if existingLike:
            raise HTTPException(
                status_code=400,
                detail="Already liked"
            )
        like = RecipeLike(
        user_id=data.user_id,
        recipe_id=data.recipe_id,
        )
        db.add(like)
        await db.commit()
        await db.refresh(like)

        return {
            "message":"Liked",
            "Like_id":like.id
        }
    except HTTPException as e:
        raise HTTPException(
            status_code=500,
            detail=getattr(e,"Unable to like the post")
        )
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=getattr(e,"unable to add the like in db")
        )
    