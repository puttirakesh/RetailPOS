from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(Category).filter(Category.CategoryName == name.upper()).first()

    def create_with_auto_code(self, db: Session, obj_in: CategoryCreate) -> Category:
        last = db.query(Category).order_by(Category.CategoryId.desc()).first()
        next_id = (last.CategoryId + 1) if last else 1
        data = obj_in.model_dump()
        data["CategoryName"] = data["CategoryName"].upper()
        data["CategoryCode"] = obj_in.CategoryCode or str(next_id)
        obj = Category(CategoryId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


category_crud = CRUDCategory(Category, pk_field="CategoryId")