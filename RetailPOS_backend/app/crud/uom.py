from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.uom import UOM
from app.schemas.uom import UOMCreate, UOMUpdate


class CRUDUOM(CRUDBase[UOM, UOMCreate, UOMUpdate]):
    pass


uom_crud = CRUDUOM(UOM, pk_field="UOMId")