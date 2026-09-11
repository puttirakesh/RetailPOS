from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Attribute(Base):
    __tablename__ = "RG_Attribute"
    
    AttributeId = Column(Integer, primary_key=True, index=True)
    AttributeCode = Column(String(20), nullable=False)
    AttributeName = Column(String(150), nullable=False)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())
    
    values = relationship("AttributeValue", back_populates="attribute",
                        cascade="all, delete-orphan")


class AttributeValue(Base):
    __tablename__ = "RG_AttributeValue"
    
    AttributeValueId = Column(Integer, primary_key=True, index=True)
    AttributeId = Column(Integer, ForeignKey("RG_Attribute.AttributeId"), nullable=False)
    AttributeValueCode = Column(String(20), nullable=False)
    AttributeValueName = Column(String(150), nullable=False)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())
    
    attribute = relationship("Attribute", back_populates="values")


class CategoryAttribute(Base):
    __tablename__ = "RG_CategoryAttribute"
    
    CategoryAttributeId = Column(Integer, primary_key=True)
    CategoryId = Column(Integer, ForeignKey("RG_Category.CategoryId"), nullable=False)
    AttributeId = Column(Integer, ForeignKey("RG_Attribute.AttributeId"), nullable=False)
    AttributeValueId = Column(Integer, ForeignKey("RG_AttributeValue.AttributeValueId"), nullable=True)
    IsActive = Column(Boolean, default=True)