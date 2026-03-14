from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.config.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    clerk_id = Column(String, unique=True,index=True,nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    username = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)