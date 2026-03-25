from fastapi import APIRouter
from pydantic import BaseModel
from app.services.spooncular.spooncular import get_food_image

router = APIRouter()

class ImageRequest(BaseModel):
    name: str

@router.post("/")
async def get_image(data: ImageRequest):
    if not data:
        return
    
    img = await get_food_image(data.name)

    return {
        "image_url": img
    }