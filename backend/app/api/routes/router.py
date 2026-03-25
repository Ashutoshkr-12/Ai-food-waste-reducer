from fastapi import APIRouter
from app.api.endpoints import user
from app.api.endpoints import fridge
from app.api.endpoints import community
from app.api.endpoints import comment
from app.api.endpoints import like
from app.api.endpoints import stats
from app.api.endpoints import recipes_suggestion
from app.api.endpoints import detection
from app.api.endpoints import food_image_frontend

api_router = APIRouter()

api_router.include_router(user.router, prefix="/users", tags=["Users"])
api_router.include_router(fridge.router, prefix="/fridge", tags=["Fridge"])
api_router.include_router(community.router, prefix="/community", tags=["Community"])
api_router.include_router(comment.router, prefix="/comments", tags=["Comments"])
api_router.include_router(like.router, prefix="/likes", tags=["Likes"])
api_router.include_router(stats.router, prefix="/stats", tags=["Stats"])
api_router.include_router(recipes_suggestion.router, prefix="/recipes", tags=["Recipes"],)
api_router.include_router(detection.router, prefix="/scan-fridge", tags=["Image detection"])
api_router.include_router(food_image_frontend.router, prefix="/get-image", tags=["Image"])
