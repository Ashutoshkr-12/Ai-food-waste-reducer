from sqlalchemy import (
    Column,
    JSON,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
)
from datetime import datetime, timezone

from app.config.db import Base


class CommunityRecipe(Base):
    __tablename__ = "community_recipes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    title = Column(String, nullable=False)

    description = Column(Text)

    ingredients = Column(JSON, nullable=False)

    steps = Column(JSON, nullable=False)

    image_url = Column(String, nullable=True)

    likes_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    comments_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )