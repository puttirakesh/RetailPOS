from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.purchaser import purchaser_crud
from app.schemas.purchaser import PurchaserCreate, PurchaserUpdate, PurchaserResponse

router = APIRouter(prefix="/api/purchasers", tags=["Purchasers"])


@router.get("/", response_model=List[PurchaserResponse])
def list_purchasers(db: Session = Depends(get_db)):
    return purchaser_crud.get_all(db)


@router.post("/", response_model=PurchaserResponse, status_code=201)
def create_purchaser(payload: PurchaserCreate, db: Session = Depends(get_db)):
    return purchaser_crud.create_with_auto_code(db, payload)


@router.put("/{p_id}", response_model=PurchaserResponse)
def update_purchaser(p_id: int, payload: PurchaserUpdate, db: Session = Depends(get_db)):
    obj = purchaser_crud.update(db, p_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Purchaser not found")
    return obj


@router.delete("/{p_id}", status_code=204)
def delete_purchaser(p_id: int, db: Session = Depends(get_db)):
    if p_id == 1:
        raise HTTPException(status_code=400, detail="Purchaser ID 1 is protected")
    if not purchaser_crud.delete(db, p_id):
        raise HTTPException(status_code=404, detail="Purchaser not found")