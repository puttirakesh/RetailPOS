from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal


class SupplierBase(BaseModel):
    SupplierCode: str = Field(..., min_length=1, max_length=20)
    SupplierName: str = Field(..., min_length=1, max_length=150)
    MobileNo: Optional[str] = None
    Address: Optional[str] = None
    CityId: Optional[int] = None
    StateId: Optional[int] = None
    GSTNo: Optional[str] = None
    GSTType: Optional[int] = None
    AgentId: Optional[int] = None
    OpeningBalance: Decimal = Field(default=Decimal("0.00"))
    LedgerRequired: bool = True
    IsActive: bool = True


class SupplierCreate(SupplierBase):
    pass


class SupplierUpdate(SupplierBase):
    pass


class SupplierResponse(SupplierBase):
    SupplierId: int
    CityName: Optional[str] = None
    StateName: Optional[str] = None
    StateType: Optional[int] = None
    AgentName: Optional[str] = None
    TaxScope: Optional[str] = None

    class Config:
        from_attributes = True