from sqlalchemy import Column, Integer, Float, ForeignKey
from app.config.db import Base


class UserStats(Base):
    __tablename__ = "user_stats"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    food_saved = Column(Float, default=0)
    recipes_cooked = Column(Integer, default=0)
    waste_reduced_percentage = Column(Float, default=0)