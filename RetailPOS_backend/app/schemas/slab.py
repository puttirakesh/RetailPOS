from pydantic import BaseModel, Field
from typing import Optional


# ---------- Age Slab ----------
class AgeSlabBase(BaseModel):
    AgeSlabName: str = Field(..., min_length=1, max_length=100)
    AgeSlabDesc: Optional[str] = None
    AgeFrDays: int = Field(..., ge=0)
    AgeToDays: int = Field(..., ge=0)
    IsActive: bool = True


class AgeSlabCreate(AgeSlabBase):
    AgeSlabId: Optional[int] = None


class AgeSlabUpdate(AgeSlabBase):
    pass


class AgeSlabResponse(AgeSlabBase):
    AgeSlabId: int

    class Config:
        from_attributes = True


# ---------- Price Slab ----------
class PriceSlabBase(BaseModel):
    PriceSlabName: str = Field(..., min_length=1, max_length=100)
    PriceSlabGroup: Optional[str] = None
    PriceSlabDesc: Optional[str] = None
    PriceSlabFrAmt: int = Field(..., ge=0)
    PriceSlabToAmt: int = Field(..., ge=0)
    PriceSlabSetName: Optional[str] = None
    IsActive: bool = True


class PriceSlabCreate(PriceSlabBase):
    PriceSlabID: Optional[int] = None


class PriceSlabUpdate(PriceSlabBase):
    pass


class PriceSlabResponse(PriceSlabBase):
    PriceSlabID: int

    class Config:
        from_attributes = True