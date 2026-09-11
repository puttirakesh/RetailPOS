from pydantic import BaseModel, Field
from typing import Optional

class CityBase(BaseModel):
    CityName: str = Field(..., min_length=1, max_length=100)
    StateId: int
    IsActive: bool = True

class CityCreate(CityBase):
    CityCode: Optional[str] = None

class CityUpdate(CityBase):
    pass

class CityResponse(CityBase):
    CityId: int
    CityCode: Optional[str] = None
    StateName: Optional[str] = None  # Enriched field
    
    class Config:
        from_attributes = True