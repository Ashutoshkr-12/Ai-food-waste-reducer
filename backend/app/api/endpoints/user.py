from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from app.config.db import get_db
from app.models.users import User
from app.schemas.user_schema import UserResponse
from app.services.auth.clerk_auth import get_current_clerkUser 
router = APIRouter()

@router.post("/", response_model=UserResponse)
# async def create_user(
#     data: UserCreate,
#     db: AsyncSession = Depends(get_db)
# ):
#     try:
#         alreadyExists = await db.execute(select(User).where(User.email == data.email))
#         existingUser = alreadyExists.scalar_one_or_none()

#         if existingUser:
#             raise HTTPException(
#                 status_code=400,
#                 detail = "Email already registered"
#             )
#         user = User(
#             email=data.email,
#             password=data.password,
#             username=data.username,
#         )

#         db.add(user)
#         await db.commit()
#         await db.refresh(user)

#         return user
    
#     except HTTPException as e:
#         raise HTTPException(
#             status_code=500,
#             detail=getattr(e,"Error in create user from server")
#         )
async def get_or_create_user(
    clerk_id: str,
    email: str,
    db: AsyncSession = Depends(get_db)
):
    try:
        
        result = await db.execute(
            select(User).where(User.clerk_id == clerk_id)
        )

        user = result.scalar_one_or_none()

        if user:
            return user

        user = User(
            clerk_id=clerk_id,
            email=email,
        )

        db.add(user)
        await db.commit()
        await db.refresh(user)

        return user

    except SQLAlchemyError:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error while creating user",
        )

    except Exception:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unexpected error while creating user ",
        )

# @router.get("/{user_id}")
# async def get_user(
#     user_id: int,
#     db: AsyncSession = Depends(get_db),
# ):
#     try:
#         user = await db.get(User, user_id)
#         if not user:
#             raise HTTPException( status_code=404, detail="User not found")
        
#         return user
#     except HTTPException as e:
#         raise HTTPException(
#             status_code=500,
#             detail=getattr(e,"Error in fetching user from server")
#         )
    
@router.get("/me")
async def get_current_user(
    clerk = Depends(get_current_clerkUser),
    db: AsyncSession = Depends(get_db),
):
    try:
       
        user = await get_or_create_user(
            clerk_id=clerk["clerk_id"],
            email=clerk["email"],
            db=db,
        )

        return user

    except HTTPException:
        raise

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Database error while fetching user",
        )

    except Exception:
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