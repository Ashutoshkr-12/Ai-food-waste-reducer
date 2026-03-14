from sqlalchemy import select
from datetime import date
from app.config.db import SessionLocal
from app.models.fridge_items import FridgeItem

async def mark_expired_items():
    async with SessionLocal() as db:

        today = date.today()

        result = await db.execute(
            select(FridgeItem).where(
                FridgeItem.expiry_date < today,
                FridgeItem.status == "active",
            )
        )
        
        items = result.scalars().all()

        for i in items:
            i.status = "expired"

        await db.commit()
        await db.refresh()

        print("expiry jon ran")
