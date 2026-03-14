from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from app.config.db import get_db
from app.models.comments import Comment
from app.schemas.comment_schema import CommentCreate

router = APIRouter()


@router.post("/")
async def add_comment(
    data: CommentCreate,
    db: AsyncSession = Depends(get_db),
):
    try:
        comment = Comment(**data.model_dump())

        db.add(comment)
        await db.commit()
        await db.refresh(comment)

        return comment

    except IntegrityError:
        # foreign key error / duplicate / constraint error
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid comment data",
        )

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error while adding comment",
        )

    except Exception:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )