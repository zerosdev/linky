from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Url(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String)
    slug = Column(String, unique=True, index=True)
    created_at = Column(String)