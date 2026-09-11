from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base


class UOM(Base):
    __tablename__ = "RG_UOM"

    UOMId = Column(Integer, primary_key=True, index=True)
    UOMCode = Column(String(20), nullable=False)
    UOMName = Column(String(100), nullable=False)
    IsActive = Column(Boolean, default=True)