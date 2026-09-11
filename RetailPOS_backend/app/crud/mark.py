from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.mark import Mark
from app.schemas.mark import MarkCreate, MarkUpdate


class CRUDMark(CRUDBase[Mark, MarkCreate, MarkUpdate]):
    def create_with_auto_code(self, db: Session, obj_in: MarkCreate) -> Mark:
        last = db.query(Mark).order_by(Mark.MarkId.desc()).first()
        next_id = (last.MarkId + 1) if last else 1
        data = obj_in.model_dump()
        if data.get("MarkCode"):
            data["MarkCode"] = data["MarkCode"].upper()
        obj = Mark(MarkId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


mark_crud = CRUDMark(Mark, pk_field="MarkId")