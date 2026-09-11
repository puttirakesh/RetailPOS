from pydantic import BaseModel, Field


class UOMBase(BaseModel):
    UOMCode: str = Field(..., min_length=1, max_length=20)
    UOMName: str = Field(..., min_length=1, max_length=100)
    IsActive: bool = True


class UOMCreate(UOMBase):
    pass


class UOMUpdate(UOMBase):
    pass


class UOMResponse(UOMBase):
    UOMId: int

    class Config:
        from_attributes = True