from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from datetime import datetime
from app.config.db import Base


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    recipe_id = Column(Integer, ForeignKey("community_recipes.id"))

    content = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)