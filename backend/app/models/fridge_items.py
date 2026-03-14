from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone
from app.config.db import Base


class FridgeItem(Base):
    __tablename__ = "fridge_items"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    scan_id = Column(
        Integer,
        ForeignKey("ingredient_scans.id"),
        nullable=True,
    )

    name = Column(String, nullable=False)
    quantity = Column(Integer, default=1)

    date_added = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    expiry_date = Column(
        DateTime(timezone=True)
    )

    source = Column(String)  # scan / manual