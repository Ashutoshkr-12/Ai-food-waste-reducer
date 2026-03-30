from pydantic import BaseModel

class LikeCreate(BaseModel):
    recipe_id: int

class LikeResponse(BaseModel):
    message: str
    likes_count: int