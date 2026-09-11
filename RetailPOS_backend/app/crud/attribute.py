# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.attribute import Attribute, AttributeValue
from app.schemas.attribute import (
    AttributeCreate,
    AttributeUpdate,
    AttributeValueCreate,
    AttributeValueUpdate,
)


class CRUDAttribute(CRUDBase[Attribute, AttributeCreate, AttributeUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(Attribute).filter(Attribute.AttributeName == name.upper()).first()

    def create_with_auto_code(self, db: Session, obj_in: AttributeCreate) -> Attribute:
        last = db.query(Attribute).order_by(Attribute.AttributeId.desc()).first()
        next_id = (last.AttributeId + 1) if last else 1
        data = obj_in.model_dump()
        data["AttributeName"] = data["AttributeName"].upper()
        data["AttributeCode"] = str(next_id)
        obj = Attribute(AttributeId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


class CRUDAttributeValue(CRUDBase[AttributeValue, AttributeValueCreate, AttributeValueUpdate]):
    def create_with_auto_code(self, db: Session, obj_in: AttributeValueCreate, attribute_id: int) -> AttributeValue:
        last = db.query(AttributeValue).order_by(AttributeValue.AttributeValueId.desc()).first()
        next_id = (last.AttributeValueId + 1) if last else 1
        data = obj_in.model_dump()
        data["AttributeValueName"] = data["AttributeValueName"].upper()
        obj = AttributeValue(
            AttributeValueId=next_id,
            AttributeId=attribute_id,
            AttributeValueCode=str(next_id),
            **data,
        )
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


attribute_crud = CRUDAttribute(Attribute, pk_field="AttributeId")
attribute_value_crud = CRUDAttributeValue(AttributeValue, pk_field="AttributeValueId")