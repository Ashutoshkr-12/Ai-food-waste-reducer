from datetime import date, timedelta
from sqlalchemy import select
from app.models.fridge_items import FridgeItem

async def get_priority_items(db, user_id):

    result = await db.execute(
        select(FridgeItem).where(
            FridgeItem.user_id == user_id,
            FridgeItem.status == "active",
        )
    )
    items = result.scalars().all()
    today = date.today()
    def priority(item):
        if item.expiry_date <= today:
            return 0
        if item.expiry_date <= today + timedelta(days=2):
            return 1
        return 2

    items.sort(key=priority)

    return items