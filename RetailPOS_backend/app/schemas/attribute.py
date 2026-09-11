from pydantic import BaseModel, Field
from typing import Optional, List


# ---------- Attribute Master ----------
class AttributeBase(BaseModel):
    AttributeName: str = Field(..., min_length=1, max_length=150)
    IsActive: bool = True


class AttributeCreate(AttributeBase):
    AttributeCode: Optional[str] = None


class AttributeUpdate(AttributeBase):
    pass


class AttributeResponse(AttributeBase):
    AttributeId: int
    AttributeCode: str

    class Config:
        from_attributes = True


# ---------- Attribute Value ----------
class AttributeValueBase(BaseModel):
    AttributeValueName: str = Field(..., min_length=1, max_length=150)
    IsActive: bool = True


class AttributeValueCreate(AttributeValueBase):
    AttributeValueCode: Optional[str] = None


class AttributeValueUpdate(AttributeValueBase):
    pass


class AttributeValueResponse(AttributeValueBase):
    AttributeValueId: int
    AttributeId: int
    AttributeValueCode: str

    class Config:
        from_attributes = True


# ---------- Category-Attribute Mapping ----------
class CategoryAttributeItem(BaseModel):
    AttributeId: int
    AttributeValueId: Optional[int] = None


class CategoryAttributeSave(BaseModel):
    CategoryId: int
    Items: List[CategoryAttributeItem]


class CategoryAttributeResponse(BaseModel):
    CategoryAttributeId: int
    CategoryId: int
    AttributeId: int
    AttributeValueId: Optional[int]
    IsActive: bool

    class Config:
        from_attributes = True