from pydantic import BaseModel, Field
from typing import Optional, List
from decimal import Decimal

class TargetSlabBase(BaseModel):
    PeriodType: str  # DAY/WEEK/MONTH/YEAR
    RangeFrom: Decimal = Decimal("0.00")
    RangeTo: Decimal = Decimal("0.00")
    TargetType: str  # AMOUNT/PERCENTAGE
    TargetValue: Decimal = Decimal("0.00")

class TargetSlabCreate(TargetSlabBase):
    pass

class TargetSlabResponse(TargetSlabBase):
    TargetId: int
    SalesPersonId: int
    
    class Config:
        from_attributes = True

class SalesPersonBase(BaseModel):
    SalesPersonCode: str = Field(..., min_length=1, max_length=20)
    SalesPersonName: str = Field(..., min_length=1, max_length=150)
    CommissionPercentage: Decimal = Decimal("0.00")
    TargetRequired: bool = False
    IsActive: bool = True

class SalesPersonCreate(SalesPersonBase):
    pass

class SalesPersonUpdate(SalesPersonBase):
    pass

class SalesPersonResponse(SalesPersonBase):
    SalesPersonId: int
    
    class Config:
        from_attributes = True