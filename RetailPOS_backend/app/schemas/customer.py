from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal


class CustomerBase(BaseModel):
    CustomerName: str = Field(..., min_length=1, max_length=150)
    MobileNo: Optional[str] = None
    EmailId: Optional[str] = None
    Address: Optional[str] = None
    CityId: Optional[int] = None
    StateId: Optional[int] = None
    GSTNo: Optional[str] = None
    OpeningBalance: Decimal = Field(default=Decimal("0.00"))
    DiscountPercentage: Decimal = Field(default=Decimal("0.00"))
    DiscountAmount: Decimal = Field(default=Decimal("0.00"))
    LedgerRequired: bool = True
    IsActive: bool = True


class CustomerCreate(CustomerBase):
    CustomerCode: Optional[str] = None


class CustomerUpdate(CustomerBase):
    pass


class CustomerResponse(CustomerBase):
    CustomerId: int
    CustomerCode: str
    CityName: Optional[str] = None
    StateName: Optional[str] = None

    class Config:
        from_attributes = True