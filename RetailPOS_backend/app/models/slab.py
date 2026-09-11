from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.core.database import Base

class AgeSlab(Base):
    __tablename__ = "rg_AgeSlabMaster"
    
    AgeSlabId = Column(Integer, primary_key=True, index=True)
    AgeSlabName = Column(String(100), nullable=False)
    AgeSlabDesc = Column(String(255), nullable=True)
    AgeFrDays = Column(Integer, nullable=False)
    AgeToDays = Column(Integer, nullable=False)
    IsActive = Column(Boolean, default=True)


class PriceSlab(Base):
    __tablename__ = "rg_PriceSlabMaster"
    
    PriceSlabID = Column(Integer, primary_key=True, index=True)
    PriceSlabName = Column(String(100), nullable=False)
    PriceSlabGroup = Column(String(100), nullable=True)
    PriceSlabDesc = Column(String(255), nullable=True)
    PriceSlabFrAmt = Column(Integer, nullable=False)
    PriceSlabToAmt = Column(Integer, nullable=False)
    PriceSlabSetName = Column(String(100), nullable=True)
    IsActive = Column(Boolean, default=True)