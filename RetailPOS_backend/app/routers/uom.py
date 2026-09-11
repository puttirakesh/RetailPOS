from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.uom import uom_crud
from app.schemas.uom import UOMCreate, UOMUpdate, UOMResponse

router = APIRouter(prefix="/api/uoms", tags=["UOM"])


@router.get("/", response_model=List[UOMResponse])
def list_uoms(db: Session = Depends(get_db)):
    return uom_crud.get_all(db)


@router.post("/", response_model=UOMResponse, status_code=201)
def create_uom(payload: UOMCreate, db: Session = Depends(get_db)):
    return uom_crud.create(db, payload)


@router.put("/{uom_id}", response_model=UOMResponse)
def update_uom(uom_id: int, payload: UOMUpdate, db: Session = Depends(get_db)):
    obj = uom_crud.update(db, uom_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="UOM not found")
    return obj


@router.delete("/{uom_id}", status_code=204)
def delete_uom(uom_id: int, db: Session = Depends(get_db)):
    if not uom_crud.delete(db, uom_id):
        raise HTTPException(status_code=404, detail="UOM not found")