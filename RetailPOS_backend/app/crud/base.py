from typing import Any, Generic, List, Optional, Type, TypeVar

# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType], pk_field: str = "Id"):
        self.model = model
        self.pk_field = pk_field

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(
            getattr(self.model, self.pk_field) == id
        ).first()

    def get_all(self, db: Session, skip: int = 0, limit: int = 1000) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, obj_in: CreateSchemaType) -> ModelType:
        obj_data = obj_in.model_dump()
        db_obj = self.model(**obj_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, id: Any, obj_in: UpdateSchemaType) -> Optional[ModelType]:
        db_obj = self.get(db, id)
        if not db_obj:
            return None
        obj_data = obj_in.model_dump(exclude_unset=True)
        for field, value in obj_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, id: Any) -> bool:
        db_obj = self.get(db, id)
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True