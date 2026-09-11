from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.category import category_crud
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["Categories"])


def _enrich(c: Category) -> CategoryResponse:
    data = CategoryResponse.model_validate(c)
    if c.group:
        data.GroupName = c.group.GroupName
    return data


@router.get("/", response_model=List[CategoryResponse])
def list_categories(db: Session = Depends(get_db)):
    rows = category_crud.get_all(db)
    return [_enrich(c) for c in rows]


@router.post("/", response_model=CategoryResponse, status_code=201)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db)):
    if category_crud.get_by_name(db, payload.CategoryName.upper()):
        raise HTTPException(status_code=400, detail="Category name already exists")
    obj = category_crud.create_with_auto_code(db, payload)
    return _enrich(obj)


@router.put("/{cat_id}", response_model=CategoryResponse)
def update_category(cat_id: int, payload: CategoryUpdate, db: Session = Depends(get_db)):
    obj = category_crud.update(db, cat_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Category not found")
    return _enrich(obj)


@router.delete("/{cat_id}", status_code=204)
def delete_category(cat_id: int, db: Session = Depends(get_db)):
    # Block if products use this category
    from app.models.product import Product
    from app.models.attribute import CategoryAttribute

    linked_products = db.query(Product).filter(
        Product.CategoryId == cat_id, Product.IsActive == True
    ).count()
    if linked_products > 0:
        raise HTTPException(status_code=400, detail="Products are linked to this category")

    mapped_attrs = db.query(CategoryAttribute).filter(
        CategoryAttribute.CategoryId == cat_id
    ).count()
    if mapped_attrs > 0:
        raise HTTPException(status_code=400, detail="Attributes are mapped to this category")

    if not category_crud.delete(db, cat_id):
        raise HTTPException(status_code=404, detail="Category not found")