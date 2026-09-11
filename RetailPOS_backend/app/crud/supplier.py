from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate, SupplierUpdate


class CRUDSupplier(CRUDBase[Supplier, SupplierCreate, SupplierUpdate]):
    def get_by_code(self, db: Session, code: str):
        return db.query(Supplier).filter(Supplier.SupplierCode == code.upper()).first()

    def get_by_gst(self, db: Session, gst: str, exclude_id: int = None):
        q = db.query(Supplier).filter(Supplier.GSTNo == gst.upper())
        if exclude_id:
            q = q.filter(Supplier.SupplierId != exclude_id)
        return q.first()

    def create_with_auto_code(self, db: Session, obj_in: SupplierCreate) -> Supplier:
        last = db.query(Supplier).order_by(Supplier.SupplierId.desc()).first()
        next_id = (last.SupplierId + 1) if last else 1
        data = obj_in.model_dump()
        data["SupplierName"] = data["SupplierName"].upper()
        data["SupplierCode"] = data["SupplierCode"].upper()
        if data.get("Address"):
            data["Address"] = data["Address"].upper()
        if data.get("GSTNo"):
            data["GSTNo"] = data["GSTNo"].upper()
        obj = Supplier(SupplierId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


supplier_crud = CRUDSupplier(Supplier, pk_field="SupplierId")