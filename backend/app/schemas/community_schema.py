from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime



class CommunityRecipeCreate(BaseModel):
    title: str
    description: str
    ingredients: List[str]
    steps: List[str]
    image_url: Optional[str] = None


class CommunityRecipeUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    ingredients: str | None = None
    steps: str | None = None
    image_url: str | None = None


class CommunityRecipeResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    ingredients: List[str]
    steps: List[str]
    image_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True