from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.product import product_crud
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse

router = APIRouter(prefix="/api/products", tags=["Products"])


def _enrich(p: Product) -> ProductResponse:
    data = ProductResponse.model_validate(p)
    if p.category:
        data.CategoryName = p.category.CategoryName
        if p.category.group:
            data.GroupName = p.category.group.GroupName
    if p.IsUnique:
        data.ProductType = "UNIQUE"
    elif p.IsBulk:
        data.ProductType = "BULK"
    data.Status = "ACTIVE" if p.IsActive else "INACTIVE"
    return data


@router.get("/", response_model=List[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    rows = db.query(Product).filter(Product.IsActive == True).order_by(Product.ProductId).all()
    return [_enrich(p) for p in rows]


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    obj = product_crud.get(db, product_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Product not found")
    return _enrich(obj)


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    if product_crud.get_by_code(db, payload.ProductCode):
        raise HTTPException(status_code=400, detail="Product Code already exists")
    if product_crud.get_by_name(db, payload.ProductName.upper()):
        raise HTTPException(status_code=400, detail="Product Name already exists")

    if payload.HSNCode and len(payload.HSNCode) > 8:
        raise HTTPException(status_code=400, detail="HSN Code max 8 digits")

    obj = product_crud.create_with_auto_code(db, payload)
    return _enrich(obj)


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    obj = product_crud.get(db, product_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Product not found")

    dup = product_crud.get_by_name(db, payload.ProductName.upper())
    if dup and dup.ProductId != product_id:
        raise HTTPException(status_code=400, detail="Product Name already in use")

    updated = product_crud.update(db, product_id, payload)
    return _enrich(updated)


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    if not product_crud.delete(db, product_id):
        raise HTTPException(status_code=404, detail="Product not found")