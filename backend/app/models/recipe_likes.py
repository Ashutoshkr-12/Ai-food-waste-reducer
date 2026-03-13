from sqlalchemy import Column, Integer, ForeignKey
from app.config.db import Base


class RecipeLike(Base):
    __tablename__ = "recipe_likes"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    recipe_id = Column(Integer, ForeignKey("community_recipes.id"))