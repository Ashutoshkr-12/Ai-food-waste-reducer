from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.config.db import Base


class FridgeItem(Base):
    __tablename__ = "fridge_items"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String, nullable=False)
    quantity = Column(Integer, default=1)

    date_added = Column(DateTime, default=datetime.utcnow)
    expiry_date = Column(DateTime)

    source = Column(String)  # scan / manual