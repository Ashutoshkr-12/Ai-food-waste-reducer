from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from ...config.db import get_db

router = APIRouter()

@router.get("/")
async def home(db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT 1"))
    return {"msg": "connected"}

