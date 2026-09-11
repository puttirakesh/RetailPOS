# pyrefly: ignore [missing-import]
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

# pyrefly: ignore [missing-import]
from sqlalchemy.orm import relationship

from app.core.database import Base


class Category(Base):
    __tablename__ = "RG_Category"
    
    CategoryId = Column(Integer, primary_key=True, index=True)
    CategoryCode = Column(String(20), nullable=False)
    CategoryName = Column(String(150), nullable=False)
    GroupId = Column(Integer, ForeignKey("RG_Group.GroupId"), nullable=False)
    IsActive = Column(Boolean, default=True)
    
    group = relationship("Group", lazy="joined")