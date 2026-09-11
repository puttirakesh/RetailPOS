from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal

class BrandBase(BaseModel):
    BrandName: str = Field(..., min_length=1, max_length=150)
    MarginPercentage: Decimal = Field(default=Decimal("0.00"))
    IsActive: bool = True

class BrandCreate(BrandBase):
    BrandCode: Optional[str] = None  # Auto-generated if not provided

class BrandUpdate(BrandBase):
    pass

class BrandResponse(BrandBase):
    BrandId: int
    BrandCode: str
    
    class Config:
        from_attributes = True