from sqlalchemy import select
from app.models.users import User
from app.models.user_stats import UserStats


async def get_current_user(
    db,
    clerk_id,
):

    result = await db.execute(
        select(User).where(User.clerk_id == clerk_id)
    )

    user = result.scalar_one_or_none()

    if user:
        return user

    user = User(
        clerk_id=clerk_id,
    )

    db.add(user)
    await db.flush()

    stats = UserStats(
        user_id=user.id,
        food_saved=0,
        items_added=0,
        waste_reduced=0,
    )

    db.add(stats)

    await db.commit()
    await db.refresh(user)

    return user