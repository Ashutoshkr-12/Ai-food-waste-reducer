from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime,
    UniqueConstraint,
)
from datetime import datetime, timezone

from app.config.db import Base


class RecipeLike(Base):
    __tablename__ = "recipe_likes"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "recipe_id",
            name="unique_user_recipe_like",
        ),
    )

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    recipe_id = Column(
        Integer,
        ForeignKey("community_recipes.id"),
        nullable=False,
        index=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )