from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class Agent(Base):
    __tablename__ = "RG_Agent"
    
    AgentId = Column(Integer, primary_key=True, index=True)
    AgentName = Column(String(150), nullable=False)
    Mobile = Column(String(15), nullable=True)
    Address = Column(String(255), nullable=True)
    CityId = Column(Integer, ForeignKey("RG_City.CityId"), nullable=True)
    
    city = relationship("City", lazy="joined")