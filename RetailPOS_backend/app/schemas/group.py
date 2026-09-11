from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal

class GroupBase(BaseModel):
    GroupName: str = Field(..., min_length=1, max_length=150)
    SlabReq: bool = False
    TaxId: Optional[int] = None
    BValue: Decimal = Decimal("0.00")
    BTaxId: Optional[int] = None
    AValue: Decimal = Decimal("0.00")
    ATaxId: Optional[int] = None

class GroupCreate(GroupBase):
    GroupCode: Optional[str] = None

class GroupUpdate(GroupBase):
    pass

class GroupResponse(GroupBase):
    GroupId: int
    GroupCode: str
    
    class Config:
        from_attributes = True