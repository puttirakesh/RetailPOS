from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.group import Group
from app.schemas.group import GroupCreate, GroupUpdate


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(Group).filter(Group.GroupName == name.upper()).first()

    def create_with_auto_code(self, db: Session, obj_in: GroupCreate) -> Group:
        last = db.query(Group).order_by(Group.GroupId.desc()).first()
        next_id = (last.GroupId + 1) if last else 1
        data = obj_in.model_dump()
        data["GroupName"] = data["GroupName"].upper()
        data["GroupCode"] = obj_in.GroupCode or str(next_id)
        obj = Group(GroupId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


group_crud = CRUDGroup(Group, pk_field="GroupId")