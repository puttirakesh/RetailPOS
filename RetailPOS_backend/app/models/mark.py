from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric
from sqlalchemy.sql import func
from app.core.database import Base

class Mark(Base):
    __tablename__ = "RG_Mark"
    
    MarkId = Column(Integer, primary_key=True, index=True)
    MarkCode = Column(String(50), nullable=True)
    MarkAmount = Column(Numeric(18, 2), default=0.00)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())