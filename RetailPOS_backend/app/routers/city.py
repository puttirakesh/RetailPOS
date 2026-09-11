from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.city import city_crud
from app.models.city import City
from app.schemas.city import CityCreate, CityUpdate, CityResponse

router = APIRouter(prefix="/api/cities", tags=["Cities"])


@router.get("/", response_model=List[CityResponse])
def list_cities(db: Session = Depends(get_db)):
    cities = city_crud.get_all(db)
    # Enrich with StateName
    result = []
    for c in cities:
        data = CityResponse.model_validate(c)
        if c.state:
            data.StateName = c.state.StateName
        result.append(data)
    return result


@router.post("/", response_model=CityResponse, status_code=201)
def create_city(payload: CityCreate, db: Session = Depends(get_db)):
    if city_crud.get_by_name(db, payload.CityName.upper()):
        raise HTTPException(status_code=400, detail="City already exists")
    return city_crud.create_with_auto_code(db, payload)


@router.put("/{city_id}", response_model=CityResponse)
def update_city(city_id: int, payload: CityUpdate, db: Session = Depends(get_db)):
    existing = city_crud.get(db, city_id)
    if not existing:
        raise HTTPException(status_code=404, detail="City not found")
    
    dup = city_crud.get_by_name(db, payload.CityName.upper())
    if dup and dup.CityId != city_id:
        raise HTTPException(status_code=400, detail="City name already in use")
    
    return city_crud.update(db, city_id, payload)


@router.delete("/{city_id}", status_code=204)
def delete_city(city_id: int, db: Session = Depends(get_db)):
    # Check dependencies (customers, suppliers, agents use this city)
    from app.models.customer import Customer
    from app.models.supplier import Supplier
    from app.models.agent import Agent
    
    in_use = (
        db.query(Customer).filter(Customer.CityId == city_id).count() +
        db.query(Supplier).filter(Supplier.CityId == city_id).count() +
        db.query(Agent).filter(Agent.CityId == city_id).count()
    )
    if in_use > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete: City is used by customers/suppliers/agents"
        )
    
    if not city_crud.delete(db, city_id):
        raise HTTPException(status_code=404, detail="City not found")