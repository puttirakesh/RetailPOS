from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal


class TaxMasterBase(BaseModel):
    TaxName: str = Field(..., min_length=1, max_length=100)
    TaxPercentage: Decimal = Field(default=Decimal("0.00"))
    IsActive: bool = True


class TaxMasterCreate(TaxMasterBase):
    pass


class TaxMasterUpdate(TaxMasterBase):
    pass


class TaxMasterResponse(TaxMasterBase):
    TaxId: int

    class Config:
        from_attributes = True