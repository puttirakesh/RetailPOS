from pydantic import BaseModel, Field
from typing import Optional

class PurchaserBase(BaseModel):
    PurchaserName: str = Field(..., min_length=1, max_length=150)
    PurchaserCode: Optional[str] = None
    IsActive: bool = True

class PurchaserCreate(PurchaserBase):
    pass

class PurchaserUpdate(PurchaserBase):
    pass

class PurchaserResponse(PurchaserBase):
    PurchaserId: int
    
    class Config:
        from_attributes = True