from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.purchaser import Purchaser
from app.schemas.purchaser import PurchaserCreate, PurchaserUpdate


class CRUDPurchaser(CRUDBase[Purchaser, PurchaserCreate, PurchaserUpdate]):
    def create_with_auto_code(self, db: Session, obj_in: PurchaserCreate) -> Purchaser:
        last = db.query(Purchaser).order_by(Purchaser.PurchaserId.desc()).first()
        next_id = (last.PurchaserId + 1) if last else 1
        data = obj_in.model_dump()
        data["PurchaserName"] = data["PurchaserName"].upper()
        if not data.get("PurchaserCode"):
            data["PurchaserCode"] = None
        obj = Purchaser(PurchaserId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


purchaser_crud = CRUDPurchaser(Purchaser, pk_field="PurchaserId")