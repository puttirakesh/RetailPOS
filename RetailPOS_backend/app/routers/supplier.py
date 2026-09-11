import re
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.crud.supplier import supplier_crud
from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate, SupplierUpdate, SupplierResponse

router = APIRouter(prefix="/api/suppliers", tags=["Suppliers"])

GST_REGEX = re.compile(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")


def _enrich(s: Supplier) -> SupplierResponse:
    data = SupplierResponse.model_validate(s)
    if s.GSTType == 3:
        data.TaxScope = "N/A"
    return data


@router.get("/", response_model=List[SupplierResponse])
def list_suppliers(search: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Supplier)
    if search:
        term = f"%{search}%"
        q = q.filter(
            (Supplier.SupplierName.like(term)) |
            (Supplier.SupplierCode.like(term)) |
            (Supplier.MobileNo.like(term))
        )
    return [_enrich(s) for s in q.order_by(Supplier.SupplierId).all()]


@router.get("/{supplier_id}", response_model=SupplierResponse)
def get_supplier(supplier_id: int, db: Session = Depends(get_db)):
    obj = supplier_crud.get(db, supplier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return _enrich(obj)


def _validate_gst(gst: Optional[str], gst_type: Optional[int]):
    if gst_type == 3:
        return
    if not gst:
        raise HTTPException(status_code=400, detail="GST Number required for this tax type")
    if not GST_REGEX.match(gst.upper()):
        raise HTTPException(status_code=400, detail="Invalid GSTIN format")


@router.post("/", response_model=SupplierResponse, status_code=201)
def create_supplier(payload: SupplierCreate, db: Session = Depends(get_db)):
    if supplier_crud.get_by_code(db, payload.SupplierCode):
        raise HTTPException(status_code=400, detail="Supplier Code already exists")
    if payload.GSTNo and supplier_crud.get_by_gst(db, payload.GSTNo):
        raise HTTPException(status_code=400, detail="GST already registered")

    _validate_gst(payload.GSTNo, payload.GSTType)

    obj = supplier_crud.create_with_auto_code(db, payload)
    return _enrich(obj)


@router.put("/{supplier_id}", response_model=SupplierResponse)
def update_supplier(supplier_id: int, payload: SupplierUpdate, db: Session = Depends(get_db)):
    obj = supplier_crud.get(db, supplier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Supplier not found")

    if payload.GSTNo:
        dup = supplier_crud.get_by_gst(db, payload.GSTNo, exclude_id=supplier_id)
        if dup:
            raise HTTPException(status_code=400, detail="GST already registered")

    _validate_gst(payload.GSTNo, payload.GSTType)

    updated = supplier_crud.update(db, supplier_id, payload)
    return _enrich(updated)


@router.delete("/{supplier_id}", status_code=204)
def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    if not supplier_crud.delete(db, supplier_id):
        raise HTTPException(status_code=404, detail="Supplier not found")