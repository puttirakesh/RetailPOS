from pydantic import BaseModel, Field
from typing import Optional


class CategoryBase(BaseModel):
    CategoryName: str = Field(..., min_length=1, max_length=150)
    GroupId: int
    IsActive: bool = True


class CategoryCreate(CategoryBase):
    CategoryCode: Optional[str] = None


class CategoryUpdate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    CategoryId: int
    CategoryCode: str
    GroupName: Optional[str] = None
    GroupTax: Optional[str] = None

    class Config:
        from_attributes = True