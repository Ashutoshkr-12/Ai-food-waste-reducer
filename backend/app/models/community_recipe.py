from sqlalchemy import Column, JSON, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.config.db import Base


class CommunityRecipe(Base):
    __tablename__ = "community_recipes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    description = Column(Text)

    ingredients = Column(JSON, nullable=False)
    steps = Column(JSON, nullable=False)

    image_url = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )