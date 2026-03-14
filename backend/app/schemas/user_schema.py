from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    clerk_id: str
    email: str
    username: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    clerk_id: str
    email: str
    username: str | None

    class Config:
        from_attributes = True