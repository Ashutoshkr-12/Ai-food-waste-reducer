# app/schemas/scan_schema.py

from pydantic import BaseModel
from typing import List, Optional


class ScanCreate(BaseModel):
    image_url: str


class ScanResult(BaseModel):
    ingredients: List[str]


class ScanResponse(BaseModel):
    id: int
    image_url: str
    scan_result: list[str]

    class Config:
        from_attributes = True