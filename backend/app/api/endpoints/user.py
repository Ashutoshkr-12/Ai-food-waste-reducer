from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config.db import get_db
from app.models.users import User
from app.schemas.user_schema import UserCreate, UserResponse

router = APIRouter()


@router.post("/", response_model=UserResponse)
async def create_user(
    data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        alreadyExists = await db.execute(select(User).where(User.email == data.email))
        existingUser = alreadyExists.scalar_one_or_none()

        if existingUser:
            raise HTTPException(
                status_code=400,
                detail = "Email already registered"
            )
        user = User(
            email=data.email,
            password=data.password,
            username=data.username,
        )

        db.add(user)
        await db.commit()
        await db.refresh(user)

        return user
    
    except HTTPException as e:
        raise HTTPException(
            status_code=500,
            detail=getattr(e,"Error in create user from server")
        )

@router.get("/{user_id}")
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
):
    try:
        user = await db.get(User, user_id)
        if not user:
            raise HTTPException( status_code=404, detail="User not found")
        
        return user
    except HTTPException as e:
        raise HTTPException(
            status_code=500,
            detail=getattr(e,"Error in fetching user from server")
        )