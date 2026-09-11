from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.taxmaster import TaxMaster
from app.schemas.taxmaster import TaxMasterCreate, TaxMasterUpdate


class CRUDTaxMaster(CRUDBase[TaxMaster, TaxMasterCreate, TaxMasterUpdate]):
    pass


taxmaster_crud = CRUDTaxMaster(TaxMaster, pk_field="TaxId")