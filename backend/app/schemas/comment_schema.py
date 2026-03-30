from pydantic import BaseModel
from datetime import datetime

class CommentCreate(BaseModel):
    id: int
    text: str


class CommentResponse(BaseModel):
    id: int
    user_id: int
    recipe_id: int
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True