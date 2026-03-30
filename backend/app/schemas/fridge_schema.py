from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class FridgeItemCreate(BaseModel):
    name: str
    quantity: int
    expiry_date: Optional[date]
    source: Optional[str] = "manual"
    scan_id: Optional[int] = None
    image_url: str | None = None


class FridgeItemsCreate(BaseModel):
    items: List[FridgeItemCreate]


class FridgeItemResponse(BaseModel):
    id: int
    name: str
    quantity: int

    expiry_date: date
    source: str
    status: str
    image_url: str | None

    scan_id: Optional[int]

    date_added: datetime
    updated_at: datetime

    class Config:
        from_attributes = True