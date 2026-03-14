from pydantic import BaseModel

class LikeCreate(BaseModel):
    user_id: int
    recipe_id: int
    