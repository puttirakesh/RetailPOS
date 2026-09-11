from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.brand import Brand
from app.schemas.brand import BrandCreate, BrandUpdate


class CRUDBrand(CRUDBase[Brand, BrandCreate, BrandUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(Brand).filter(Brand.BrandName == name.upper()).first()

    def create_with_auto_code(self, db: Session, obj_in: BrandCreate) -> Brand:
        """Auto-generate BrandCode based on next BrandId."""
        # Get max ID + 1
        max_id = db.query(Brand).order_by(Brand.BrandId.desc()).first()
        next_id = (max_id.BrandId + 1) if max_id else 1
        
        data = obj_in.model_dump()
        data["BrandName"] = data["BrandName"].upper()
        data["BrandCode"] = obj_in.BrandCode or str(next_id)
        
        db_obj = Brand(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


brand_crud = CRUDBrand(Brand, pk_field="BrandId")