from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Supplier(Base):
    __tablename__ = "RG_Supplier"
    
    SupplierId = Column(Integer, primary_key=True, index=True)
    SupplierCode = Column(String(20), nullable=False)
    SupplierName = Column(String(150), nullable=False)
    MobileNo = Column(String(15), nullable=True)
    Address = Column(Text, nullable=True)
    CityId = Column(Integer, ForeignKey("RG_City.CityId"), nullable=True)
    StateId = Column(Integer, ForeignKey("RG_State.StateId"), nullable=True)
    GSTNo = Column(String(20), nullable=True)
    GSTType = Column(Integer, nullable=True)
    AgentId = Column(Integer, ForeignKey("RG_Agent.AgentId"), nullable=True)
    OpeningBalance = Column(Numeric(18, 2), default=0.00)
    LedgerRequired = Column(Boolean, default=True)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())