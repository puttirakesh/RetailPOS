from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal

class MarkBase(BaseModel):
    MarkCode: Optional[str] = None
    MarkAmount: Decimal = Decimal("0.00")
    IsActive: bool = True

class MarkCreate(MarkBase):
    pass

class MarkUpdate(MarkBase):
    pass

class MarkResponse(MarkBase):
    MarkId: int
    
    class Config:
        from_attributes = True