from pydantic import BaseModel


class CommentCreate(BaseModel):
    recipe_id: int
    content: str


class CommentResponse(BaseModel):
    id: int
    content: str

    class Config:
        from_attributes = True