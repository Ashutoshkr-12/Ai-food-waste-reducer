from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.exc import SQLAlchemyError
from app.config.db import get_db
from app.models.community_recipe import CommunityRecipe
from app.schemas.community_schema import CommunityRecipeResponse
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

@router.get(
        "/{id}",
        response_model=CommunityRecipeResponse
        )
async def get_single_recipe(
    id: int,
    db: AsyncSession = Depends(get_db)
):
    try:
        recipe = await db.get(CommunityRecipe,id)

        if not recipe:
            raise HTTPException(
                status_code=404,
                detail="recipe not found"
            )
        
        return recipe
    except HTTPException as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Unable to fetch item"
        )
    except SQLAlchemyError as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail="SQLError"
        )