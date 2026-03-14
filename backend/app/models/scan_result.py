from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from datetime import datetime
from app.config.db import Base


class IngredientScan(Base):
    __tablename__ = "ingredient_scans"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    image_url = Column(String)

    scan_result = Column(JSON)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )