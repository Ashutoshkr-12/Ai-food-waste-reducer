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
    title: Optional[str] = None
    description: Optional[str] = None
    ingredients: Optional[List[str]] = None
    steps: Optional[List[str]] = None
    image_url: Optional[str] = None


class CommunityRecipeResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    ingredients: List[str]
    steps: List[str]
    image_url: Optional[str]
    likes_count: int
    comments_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True