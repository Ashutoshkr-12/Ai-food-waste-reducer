from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from app.config.db import get_db
from app.models.comments import Comment
from app.models.community_recipe import CommunityRecipe
from app.schemas.comment_schema import CommentCreate,CommentResponse
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user

router = APIRouter()

@router.post("/")
async def add_comment(
    data: CommentCreate,
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser)
):
    try:

        user = await get_current_user(
            clerk_id=clerk["clerk_id"],
            db=db,
        )

        # check recipe exists
        result = await db.execute(
            select(CommunityRecipe).where(
                CommunityRecipe.id == data.id
            )
        )

        recipe = result.scalar_one_or_none()

        if not recipe:
            raise HTTPException(
                status_code=404,
                detail="Recipe not found",
            )

        comment = Comment(
            user_id=user.id,
            recipe_id=data.id,
            content=data.text,
        )

        db.add(comment)

        # update count
        recipe.comments_count += 1

        await db.commit()
        await db.refresh(comment)

        return {
            "message": "Comment added",
            "comments_count": recipe.comments_count,
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
    

@router.get("/{id}")
async def get_comments(
    id: int,
    db: AsyncSession = Depends(get_db),
):

    result = await db.execute(
        select(Comment).where(
            Comment.recipe_id == id
        )
    )

    comments = result.scalars().all()

    return comments