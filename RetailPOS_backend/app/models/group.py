from sqlalchemy import Column, Integer, String, Boolean, Numeric, ForeignKey
from app.core.database import Base

class Group(Base):
    __tablename__ = "RG_Group"
    
    GroupId = Column(Integer, primary_key=True, index=True)
    GroupCode = Column(String(20), nullable=False)
    GroupName = Column(String(150), nullable=False)
    SlabReq = Column(Boolean, default=False)
    TaxId = Column(Integer, ForeignKey("RG_TaxMaster.TaxId"), nullable=True)
    BValue = Column(Numeric(18, 2), default=0.00)
    BTaxId = Column(Integer, ForeignKey("RG_TaxMaster.TaxId"), nullable=True)
    AValue = Column(Numeric(18, 2), default=0.00)
    ATaxId = Column(Integer, ForeignKey("RG_TaxMaster.TaxId"), nullable=True)