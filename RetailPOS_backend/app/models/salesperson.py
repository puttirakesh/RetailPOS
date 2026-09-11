from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class SalesPerson(Base):
    __tablename__ = "RG_SalesPerson"
    
    SalesPersonId = Column(Integer, primary_key=True, index=True)
    SalesPersonCode = Column(String(20), nullable=False)
    SalesPersonName = Column(String(150), nullable=False)
    CommissionPercentage = Column(Numeric(10, 2), default=0.00)
    TargetRequired = Column(Boolean, default=False)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())
    
    targets = relationship("SalesPersonTarget", back_populates="salesperson",
                          cascade="all, delete-orphan")


class SalesPersonTarget(Base):
    __tablename__ = "RG_SalesPersonTarget"
    
    TargetId = Column(Integer, primary_key=True)
    SalesPersonId = Column(Integer, ForeignKey("RG_SalesPerson.SalesPersonId"), primary_key=True)
    PeriodType = Column(String(20), nullable=False)   # DAY/WEEK/MONTH/YEAR
    RangeFrom = Column(Numeric(18, 2), default=0.00)
    RangeTo = Column(Numeric(18, 2), default=0.00)
    TargetType = Column(String(20), nullable=False)   # AMOUNT/PERCENTAGE
    TargetValue = Column(Numeric(18, 2), default=0.00)
    
    salesperson = relationship("SalesPerson", back_populates="targets")