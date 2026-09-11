from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.salesperson import SalesPerson
from app.schemas.salesperson import SalesPersonCreate, SalesPersonUpdate


class CRUDSalesPerson(CRUDBase[SalesPerson, SalesPersonCreate, SalesPersonUpdate]):
    def create_with_auto_code(self, db: Session, obj_in: SalesPersonCreate) -> SalesPerson:
        last = db.query(SalesPerson).order_by(SalesPerson.SalesPersonId.desc()).first()
        next_id = (last.SalesPersonId + 1) if last else 1
        data = obj_in.model_dump()
        data["SalesPersonName"] = data["SalesPersonName"].upper()
        data["SalesPersonCode"] = data["SalesPersonCode"].upper()
        obj = SalesPerson(SalesPersonId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


salesperson_crud = CRUDSalesPerson(SalesPerson, pk_field="SalesPersonId")