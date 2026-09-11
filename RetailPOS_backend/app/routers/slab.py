from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.slab import age_slab_crud, price_slab_crud
from app.schemas.slab import (
    AgeSlabCreate, AgeSlabUpdate, AgeSlabResponse,
    PriceSlabCreate, PriceSlabUpdate, PriceSlabResponse,
)

router = APIRouter(prefix="/api/slabs", tags=["Slabs"])


# ---------- Age Slabs ----------
@router.get("/age", response_model=List[AgeSlabResponse])
def list_age_slabs(db: Session = Depends(get_db)):
    return age_slab_crud.get_all(db)


@router.post("/age", response_model=AgeSlabResponse, status_code=201)
def create_age_slab(payload: AgeSlabCreate, db: Session = Depends(get_db)):
    return age_slab_crud.create(db, payload)


@router.put("/age/{slab_id}", response_model=AgeSlabResponse)
def update_age_slab(slab_id: int, payload: AgeSlabUpdate, db: Session = Depends(get_db)):
    obj = age_slab_crud.update(db, slab_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Age slab not found")
    return obj


@router.delete("/age/{slab_id}", status_code=204)
def delete_age_slab(slab_id: int, db: Session = Depends(get_db)):
    if not age_slab_crud.delete(db, slab_id):
        raise HTTPException(status_code=404, detail="Age slab not found")


# ---------- Price Slabs ----------
@router.get("/price", response_model=List[PriceSlabResponse])
def list_price_slabs(db: Session = Depends(get_db)):
    return price_slab_crud.get_all(db)


@router.post("/price", response_model=PriceSlabResponse, status_code=201)
def create_price_slab(payload: PriceSlabCreate, db: Session = Depends(get_db)):
    return price_slab_crud.create(db, payload)


@router.put("/price/{slab_id}", response_model=PriceSlabResponse)
def update_price_slab(slab_id: int, payload: PriceSlabUpdate, db: Session = Depends(get_db)):
    obj = price_slab_crud.update(db, slab_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Price slab not found")
    return obj


@router.delete("/price/{slab_id}", status_code=204)
def delete_price_slab(slab_id: int, db: Session = Depends(get_db)):
    if not price_slab_crud.delete(db, slab_id):
        raise HTTPException(status_code=404, detail="Price slab not found")