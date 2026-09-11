from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.salesperson import SalesPerson, SalesPersonTarget
from app.schemas.salesperson import (
    SalesPersonCreate, SalesPersonUpdate, SalesPersonResponse,
    TargetSlabCreate, TargetSlabResponse,
)

router = APIRouter(prefix="/api/salespersons", tags=["SalesPersons"])


@router.get("/", response_model=List[SalesPersonResponse])
def list_salespersons(db: Session = Depends(get_db)):
    return db.query(SalesPerson).order_by(SalesPerson.SalesPersonId).all()


@router.post("/", response_model=SalesPersonResponse, status_code=201)
def create_salesperson(payload: SalesPersonCreate, db: Session = Depends(get_db)):
    # Duplicate check
    dup = db.query(SalesPerson).filter(
        SalesPerson.SalesPersonCode == payload.SalesPersonCode
    ).first()
    if dup:
        raise HTTPException(status_code=400, detail="SalesPerson Code already exists")
    
    # Auto ID
    last = db.query(SalesPerson).order_by(SalesPerson.SalesPersonId.desc()).first()
    next_id = (last.SalesPersonId + 1) if last else 1
    
    obj = SalesPerson(SalesPersonId=next_id, **payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/{sp_id}", response_model=SalesPersonResponse)
def update_salesperson(sp_id: int, payload: SalesPersonUpdate, db: Session = Depends(get_db)):
    obj = db.query(SalesPerson).filter(SalesPerson.SalesPersonId == sp_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    
    for k, v in payload.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{sp_id}", status_code=204)
def delete_salesperson(sp_id: int, db: Session = Depends(get_db)):
    if sp_id == 1:
        raise HTTPException(status_code=400, detail="ID 1 is protected")
    
    # Check if targets exist
    target_count = db.query(SalesPersonTarget).filter(
        SalesPersonTarget.SalesPersonId == sp_id
    ).count()
    if target_count > 0:
        raise HTTPException(
            status_code=400,
            detail="Remove target slabs before deleting this salesperson"
        )
    
    obj = db.query(SalesPerson).filter(SalesPerson.SalesPersonId == sp_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    
    db.delete(obj)
    db.commit()


# ---------- Target Slab Endpoints ----------

@router.get("/{sp_id}/targets", response_model=List[TargetSlabResponse])
def get_targets(sp_id: int, db: Session = Depends(get_db)):
    return db.query(SalesPersonTarget).filter(
        SalesPersonTarget.SalesPersonId == sp_id
    ).order_by(SalesPersonTarget.TargetId).all()


@router.post("/{sp_id}/targets", response_model=TargetSlabResponse, status_code=201)
def add_target(sp_id: int, payload: TargetSlabCreate, db: Session = Depends(get_db)):
    # Validate ranges
    if payload.RangeFrom >= payload.RangeTo:
        raise HTTPException(status_code=400, detail="RangeTo must be > RangeFrom")
    
    # Auto ID per salesperson
    last = db.query(SalesPersonTarget).filter(
        SalesPersonTarget.SalesPersonId == sp_id
    ).order_by(SalesPersonTarget.TargetId.desc()).first()
    next_id = (last.TargetId + 1) if last else 1
    
    obj = SalesPersonTarget(
        SalesPersonId=sp_id,
        TargetId=next_id,
        **payload.model_dump()
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{sp_id}/targets/{target_id}", status_code=204)
def delete_target(sp_id: int, target_id: int, db: Session = Depends(get_db)):
    obj = db.query(SalesPersonTarget).filter(
        SalesPersonTarget.SalesPersonId == sp_id,
        SalesPersonTarget.TargetId == target_id
    ).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Target not found")
    
    db.delete(obj)
    # Resequence remaining
    remaining = db.query(SalesPersonTarget).filter(
        SalesPersonTarget.SalesPersonId == sp_id,
        SalesPersonTarget.TargetId > target_id
    ).order_by(SalesPersonTarget.TargetId).all()
    for r in remaining:
        r.TargetId -= 1
    db.commit()