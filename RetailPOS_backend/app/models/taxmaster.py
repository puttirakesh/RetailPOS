from sqlalchemy import Column, Integer, String, Boolean, Numeric
from app.core.database import Base


class TaxMaster(Base):
    __tablename__ = "RG_TaxMaster"

    TaxId = Column(Integer, primary_key=True, index=True)
    TaxName = Column(String(100), nullable=False)
    TaxPercentage = Column(Numeric(5, 2), default=0.00)
    IsActive = Column(Boolean, default=True)