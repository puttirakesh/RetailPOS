from pydantic import BaseModel, Field
from typing import Optional

class AgentBase(BaseModel):
    AgentName: str = Field(..., min_length=1, max_length=150)
    Mobile: Optional[str] = None
    Address: Optional[str] = None
    CityId: Optional[int] = None

class AgentCreate(AgentBase):
    pass

class AgentUpdate(AgentBase):
    pass

class AgentResponse(AgentBase):
    AgentId: int
    CityName: Optional[str] = None
    
    class Config:
        from_attributes = True