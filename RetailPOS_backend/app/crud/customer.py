from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CRUDCustomer(CRUDBase[Customer, CustomerCreate, CustomerUpdate]):
    def get_by_code(self, db: Session, code: str):
        return db.query(Customer).filter(Customer.CustomerCode == code.upper()).first()

    def get_by_mobile(self, db: Session, mobile: str, exclude_id: int = None):
        q = db.query(Customer).filter(Customer.MobileNo == mobile)
        if exclude_id:
            q = q.filter(Customer.CustomerId != exclude_id)
        return q.first()

    def create_with_auto_code(self, db: Session, obj_in: CustomerCreate) -> Customer:
        last = db.query(Customer).order_by(Customer.CustomerId.desc()).first()
        next_id = (last.CustomerId + 1) if last else 1
        data = obj_in.model_dump()
        data["CustomerName"] = data["CustomerName"].upper()
        if data.get("Address"):
            data["Address"] = data["Address"].upper()
        if data.get("GSTNo"):
            data["GSTNo"] = data["GSTNo"].upper()
        data["CustomerCode"] = str(next_id)
        obj = Customer(CustomerId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


customer_crud = CRUDCustomer(Customer, pk_field="CustomerId")