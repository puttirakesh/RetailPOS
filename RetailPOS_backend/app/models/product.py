from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Product(Base):
    __tablename__ = "RG_Product"
    
    ProductId = Column(Integer, primary_key=True, index=True)
    ProductCode = Column(String(50), nullable=False)
    ProductName = Column(String(255), nullable=False)
    CategoryId = Column(Integer, ForeignKey("RG_Category.CategoryId"), nullable=False)
    HSNCode = Column(String(20), nullable=True)
    Remarks = Column(Text, nullable=True)
    UOMId = Column(Integer, nullable=True)
    IsUnique = Column(Boolean, default=True)
    IsBulk = Column(Boolean, default=False)
    AutoEANRequired = Column(Boolean, default=False)
    EntryWiseEANRequired = Column(Boolean, default=False)
    DiscountNotApplicable = Column(Boolean, default=False)
    ManualBarcodeRestriction = Column(Boolean, default=False)
    NonInventory = Column(Boolean, default=False)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())
    
    category = relationship("Category", lazy="joined")