from pydantic import BaseModel
from typing import List


class ScanResult(BaseModel):
    ingredients: List[str]