from pydantic import BaseModel
from typing import Optional

class StateResponse(BaseModel):
    StateId: int
    StateName: str
    StateCode: Optional[str] = None
    StateType: Optional[int] = None
    IsActive: bool
    
    class Config:
        from_attributes = True