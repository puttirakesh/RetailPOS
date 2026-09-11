from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Purchaser(Base):
    __tablename__ = "RG_Purchaser"
    
    PurchaserId = Column(Integer, primary_key=True, index=True)
    PurchaserCode = Column(String(20), nullable=True)
    PurchaserName = Column(String(150), nullable=False)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())