from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from app.config.db import get_db
from app.models.users import User
from app.schemas.user_schema import UserResponse
from app.services.auth.clerk_auth import get_current_clerkUser 
from app.services.auth.user_service import get_current_user

router = APIRouter()

@router.post("/", response_model=UserResponse)
async def create_user(
    clerk_id: str,
    db: AsyncSession = Depends(get_db),
):
    return await get_current_user(
        db=db,
        clerk_id=clerk_id,
        
    )

@router.get("/me")
async def get_me(
    clerk = Depends(get_current_clerkUser),
    db: AsyncSession = Depends(get_db),
):
    try:
       
        user = await get_current_user(
            clerk_id=clerk["clerk_id"],
            db=db,
        )
        return user
    
    except HTTPException:
        raise

    except SQLAlchemyError as e:
        print("SQLERROR in fetching user",e)
        raise HTTPException(
            status_code=500,
            detail="Database error while fetching user",
        )

    except Exception as e:
        print("Exception in fetching user",e)
        raise HTTPException(
            status_code=500,
            detail="Unexpected error while fetching me",
        )
    
@router.get("/{user_id}")
async def get_user_by_id(
    user_id: int,
    db: AsyncSession = Depends(get_db),
):
    try:

        user = await db.get(User, user_id)

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found with this id",
            )

        return user

    except HTTPException:
        raise

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Database error",
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unexpected error in fetching user with user_id",
        )