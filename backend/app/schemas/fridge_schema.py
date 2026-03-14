from pydantic import BaseModel
from datetime import datetime


class FridgeItemCreate(BaseModel):
    name: str
    quantity: int
    expiry_date: datetime


class FridgeItemResponse(BaseModel):
    id: int
    name: str
    quantity: int
    source: str
    expiry_date: datetime

    class Config:
        from_attributes = True