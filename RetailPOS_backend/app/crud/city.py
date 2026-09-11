from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.city import City
from app.schemas.city import CityCreate, CityUpdate


class CRUDCity(CRUDBase[City, CityCreate, CityUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(City).filter(City.CityName == name.upper()).first()

    def create_with_auto_code(self, db: Session, obj_in: CityCreate) -> City:
        max_id = db.query(City).order_by(City.CityId.desc()).first()
        next_id = (max_id.CityId + 1) if max_id else 1
        
        data = obj_in.model_dump()
        data["CityName"] = data["CityName"].upper()
        data["CityCode"] = obj_in.CityCode or str(next_id)
        
        db_obj = City(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


city_crud = CRUDCity(City, pk_field="CityId")