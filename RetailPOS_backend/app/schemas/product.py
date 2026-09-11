from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    ProductCode: str = Field(..., min_length=1, max_length=50)
    ProductName: str = Field(..., min_length=1, max_length=255)
    CategoryId: int
    HSNCode: Optional[str] = None
    Remarks: Optional[str] = None
    UOMId: Optional[int] = None
    IsUnique: bool = True
    IsBulk: bool = False
    AutoEANRequired: bool = False
    EntryWiseEANRequired: bool = False
    DiscountNotApplicable: bool = False
    ManualBarcodeRestriction: bool = False
    NonInventory: bool = False
    IsActive: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    ProductId: int
    CategoryName: Optional[str] = None
    GroupName: Optional[str] = None
    TaxName: Optional[str] = None
    ProductType: Optional[str] = None
    Status: Optional[str] = None

    class Config:
        from_attributes = True