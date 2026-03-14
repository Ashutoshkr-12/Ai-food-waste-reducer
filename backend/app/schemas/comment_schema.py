# from pydantic import BaseModel


# class CommentCreate(BaseModel):
#     recipe_id: int
#     content: str


# class CommentResponse(BaseModel):
#     id: int
#     content: str

#     class Config:
#         from_attributes = True

from pydantic import BaseModel
from datetime import datetime


class CommentCreate(BaseModel):
    recipe_id: int
    content: str


class CommentResponse(BaseModel):
    id: int
    user_id: int
    recipe_id: int

    content: str

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True