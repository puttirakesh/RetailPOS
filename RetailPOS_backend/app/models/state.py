from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class State(Base):
    __tablename__ = "RG_State"
    
    StateId = Column(Integer, primary_key=True, index=True)
    StateName = Column(String(100), nullable=False)
    StateCode = Column(String(10), nullable=True)
    StateType = Column(Integer, nullable=True)  # 1=Local, 2=Interstate
    IsActive = Column(Boolean, default=True)
    CreatedDate = Column(DateTime, server_default=func.now())