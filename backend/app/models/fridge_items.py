from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Date
from datetime import datetime, timezone
from app.config.db import Base


class FridgeItem(Base):
    __tablename__ = "fridge_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        index=True,
        nullable=False,
    )
    scan_id = Column(
        Integer,
        ForeignKey("ingredient_scans.id"),
        nullable=True,
        index=True,
    )
    name = Column(String, nullable=False)
    quantity = Column(
        Integer,
        default=1,
        nullable=False,
    )
    expiry_date = Column(
        Date,
        nullable=False,
    )
    source = Column(
        String,
        default="manual",
        nullable=False,
    )
    status = Column(
        String,
        default="active",
        nullable=False,
    )
    date_added = Column(
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
    image_url = Column(String, nullable=True)