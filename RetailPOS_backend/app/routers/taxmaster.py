from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.taxmaster import taxmaster_crud
from app.schemas.taxmaster import TaxMasterCreate, TaxMasterUpdate, TaxMasterResponse

router = APIRouter(prefix="/api/taxes", tags=["Tax Master"])


@router.get("/", response_model=List[TaxMasterResponse])
def list_taxes(db: Session = Depends(get_db)):
    return taxmaster_crud.get_all(db)


@router.post("/", response_model=TaxMasterResponse, status_code=201)
def create_tax(payload: TaxMasterCreate, db: Session = Depends(get_db)):
    return taxmaster_crud.create(db, payload)


@router.put("/{tax_id}", response_model=TaxMasterResponse)
def update_tax(tax_id: int, payload: TaxMasterUpdate, db: Session = Depends(get_db)):
    obj = taxmaster_crud.update(db, tax_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Tax not found")
    return obj


@router.delete("/{tax_id}", status_code=204)
def delete_tax(tax_id: int, db: Session = Depends(get_db)):
    if not taxmaster_crud.delete(db, tax_id):
        raise HTTPException(status_code=404, detail="Tax not found")