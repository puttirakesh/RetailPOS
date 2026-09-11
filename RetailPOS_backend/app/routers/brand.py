from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.brand import brand_crud
from app.schemas.brand import BrandCreate, BrandUpdate, BrandResponse

router = APIRouter(prefix="/api/brands", tags=["Brands"])


@router.get("/", response_model=List[BrandResponse])
def list_brands(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return brand_crud.get_all(db, skip=skip, limit=limit)


@router.get("/{brand_id}", response_model=BrandResponse)
def get_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = brand_crud.get(db, brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand


@router.post("/", response_model=BrandResponse, status_code=status.HTTP_201_CREATED)
def create_brand(payload: BrandCreate, db: Session = Depends(get_db)):
    # Duplicate check
    if brand_crud.get_by_name(db, payload.BrandName.upper()):
        raise HTTPException(status_code=400, detail="Brand name already exists")
    
    return brand_crud.create_with_auto_code(db, payload)


@router.put("/{brand_id}", response_model=BrandResponse)
def update_brand(brand_id: int, payload: BrandUpdate, db: Session = Depends(get_db)):
    existing = brand_crud.get(db, brand_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Brand not found")
    
    # Duplicate name check excluding self
    dup = brand_crud.get_by_name(db, payload.BrandName.upper())
    if dup and dup.BrandId != brand_id:
        raise HTTPException(status_code=400, detail="Brand name already in use")
    
    updated = brand_crud.update(db, brand_id, payload)
    return updated


@router.delete("/{brand_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    if brand_id == 1:
        raise HTTPException(status_code=400, detail="Default Brand (ID 1) cannot be deleted")
    
    if not brand_crud.delete(db, brand_id):
        raise HTTPException(status_code=404, detail="Brand not found")