from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric
from sqlalchemy.sql import func
from app.core.database import Base

class Brand(Base):
    __tablename__ = "RG_Brand"
    
    BrandId = Column(Integer, primary_key=True, index=True)
    BrandCode = Column(String(20), nullable=False)
    BrandName = Column(String(150), nullable=False, unique=True)
    MarginPercentage = Column(Numeric(10, 2), default=0.00)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())