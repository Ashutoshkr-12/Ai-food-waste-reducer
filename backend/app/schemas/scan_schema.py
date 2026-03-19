from pydantic import BaseModel
from typing import List
from datetime import date


class ScanItem(BaseModel):
    name: str
    quantity: int
    expiry_date: date
    image_url: str | None = None


class ScanCreate(BaseModel):
    image_url: str


class ScanResponse(BaseModel):
    id: int
    image_url: str
    scan_result: List[ScanItem]

    class Config:
        from_attributes = True