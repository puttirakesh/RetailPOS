from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class City(Base):
    __tablename__ = "RG_City"
    
    CityId = Column(Integer, primary_key=True, index=True)
    CityCode = Column(String(20), nullable=True)
    CityName = Column(String(100), nullable=False)
    StateId = Column(Integer, ForeignKey("RG_State.StateId"), nullable=False)
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())
    
    state = relationship("State", lazy="joined")