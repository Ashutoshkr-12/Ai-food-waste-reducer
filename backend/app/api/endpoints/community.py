from fastapi import UploadFile,Form,File,APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select, desc
import json
from app.config.db import get_db
from app.models.community_recipe import CommunityRecipe
from app.schemas.community_schema import (
    CommunityRecipeCreate,
    CommunityRecipeResponse,
)
from app.services.auth.clerk_auth import get_current_clerkUser
from app.services.auth.user_service import get_current_user
from app.services.cloudinary.cloudinary import upload_result
router = APIRouter()

@router.post(
    "/",
    response_model=CommunityRecipeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_recipe(
    title: str = Form(...),
    description: str = Form(...),
    ingredients: str = Form(...),
    steps: str = Form(...),
    image: UploadFile | None = File(None),
    db: AsyncSession = Depends(get_db),
    clerk=Depends(get_current_clerkUser),
):
    try:

        user = await get_current_user(
            db=db,
            clerk_id=clerk["clerk_id"],
        )
       
        image_url = None
        if image:
            bytes_data = await  image.read()

            image_url = await upload_result(bytes_data,image.filename)

        recipe = CommunityRecipe(
            title=title,
            description=description,
            ingredients=json.loads(ingredients),
            steps=json.loads(steps),
            image_url=image_url,
            user_id=user.id,
            likes_count=0,
            comments_count=0,
        )

        db.add(recipe)
        await db.commit()
        await db.refresh(recipe)

        return recipe

    except Exception as e:
        await db.rollback()
        print(e)
        raise HTTPException(500, "error")

@router.get(
    "/",
    response_model=list[CommunityRecipeResponse],
)
async def get_recipes(
    db: AsyncSession = Depends(get_db),
):
    try:

        result = await db.execute(
            select(CommunityRecipe).order_by(
                desc(CommunityRecipe.created_at)
            )
        )

        recipes = result.scalars().all()
        for r in recipes:
            if isinstance(r.ingredients, str):
                r.ingredients = json.loads(r.ingredients)

            if isinstance(r.steps, str):
                r.steps = json.loads(r.steps)


        return recipes

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Database error while fetching recipes",
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unexpected error",
        )