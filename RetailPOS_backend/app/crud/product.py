from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(Product).filter(Product.ProductName == name.upper()).first()

    def get_by_code(self, db: Session, code: str):
        return db.query(Product).filter(Product.ProductCode == code).first()

    def create_with_auto_code(self, db: Session, obj_in: ProductCreate) -> Product:
        last = db.query(Product).order_by(Product.ProductId.desc()).first()
        next_id = (last.ProductId + 1) if last else 1
        data = obj_in.model_dump()
        data["ProductName"] = data["ProductName"].upper()
        obj = Product(ProductId=next_id, **data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj


product_crud = CRUDProduct(Product, pk_field="ProductId")