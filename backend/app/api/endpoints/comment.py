from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_db
from app.models.comments import Comment
from app.schemas.comment_schema import CommentCreate

router = APIRouter()


@router.post("/")
async def add_comment(
    data: CommentCreate,
    db: AsyncSession = Depends(get_db),
):
    comment = Comment(**data.model_dump())

    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return comment