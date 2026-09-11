from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.slab import AgeSlab, PriceSlab
from app.schemas.slab import (
    AgeSlabCreate, AgeSlabUpdate,
    PriceSlabCreate, PriceSlabUpdate,
)


class CRUDAgeSlab(CRUDBase[AgeSlab, AgeSlabCreate, AgeSlabUpdate]):
    pass


class CRUDPriceSlab(CRUDBase[PriceSlab, PriceSlabCreate, PriceSlabUpdate]):
    pass


age_slab_crud = CRUDAgeSlab(AgeSlab, pk_field="AgeSlabId")
price_slab_crud = CRUDPriceSlab(PriceSlab, pk_field="PriceSlabID")