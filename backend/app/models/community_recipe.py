from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.config.db import Base


class CommunityRecipe(Base):
    __tablename__ = "community_recipes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String, nullable=False)
    description = Column(Text)

    ingredients = Column(Text)
    steps = Column(Text)

    image_url = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)