from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.attribute import attribute_crud, attribute_value_crud
from app.models.attribute import Attribute, AttributeValue, CategoryAttribute
from app.schemas.attribute import (
    AttributeCreate, AttributeUpdate, AttributeResponse,
    AttributeValueCreate, AttributeValueUpdate, AttributeValueResponse,
    CategoryAttributeSave, CategoryAttributeResponse,
)

router = APIRouter(prefix="/api/attributes", tags=["Attributes"])

PROTECTED_VALUE_IDS = [1, 2, 3]


# ---------- Attribute Master ----------
@router.get("/", response_model=List[AttributeResponse])
def list_attributes(db: Session = Depends(get_db)):
    return attribute_crud.get_all(db)


@router.post("/", response_model=AttributeResponse, status_code=201)
def create_attribute(payload: AttributeCreate, db: Session = Depends(get_db)):
    if attribute_crud.get_by_name(db, payload.AttributeName.upper()):
        raise HTTPException(status_code=400, detail="Attribute already exists")
    return attribute_crud.create_with_auto_code(db, payload)


@router.put("/{attr_id}", response_model=AttributeResponse)
def update_attribute(attr_id: int, payload: AttributeUpdate, db: Session = Depends(get_db)):
    obj = attribute_crud.update(db, attr_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Attribute not found")
    return obj


@router.delete("/{attr_id}", status_code=204)
def delete_attribute(attr_id: int, db: Session = Depends(get_db)):
    # Check protected values
    child_ids = [str(v.AttributeValueId) for v in db.query(AttributeValue).filter(
        AttributeValue.AttributeId == attr_id
    ).all()]
    if any(vid in [str(p) for p in PROTECTED_VALUE_IDS] for vid in child_ids):
        raise HTTPException(status_code=400, detail="Contains protected values")

    db.query(AttributeValue).filter(AttributeValue.AttributeId == attr_id).delete()
    if not attribute_crud.delete(db, attr_id):
        raise HTTPException(status_code=404, detail="Attribute not found")


# ---------- Attribute Values ----------
@router.get("/{attr_id}/values", response_model=List[AttributeValueResponse])
def list_values(attr_id: int, db: Session = Depends(get_db)):
    return db.query(AttributeValue).filter(
        AttributeValue.AttributeId == attr_id
    ).order_by(AttributeValue.AttributeValueId).all()


@router.post("/{attr_id}/values", response_model=AttributeValueResponse, status_code=201)
def create_value(attr_id: int, payload: AttributeValueCreate, db: Session = Depends(get_db)):
    return attribute_value_crud.create_with_auto_code(db, payload, attr_id)


@router.put("/values/{val_id}", response_model=AttributeValueResponse)
def update_value(val_id: int, payload: AttributeValueUpdate, db: Session = Depends(get_db)):
    if val_id in PROTECTED_VALUE_IDS:
        raise HTTPException(status_code=400, detail="System-protected value")
    obj = attribute_value_crud.update(db, val_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Value not found")
    return obj


@router.delete("/values/{val_id}", status_code=204)
def delete_value(val_id: int, db: Session = Depends(get_db)):
    if val_id in PROTECTED_VALUE_IDS:
        raise HTTPException(status_code=400, detail="System-protected value")
    if not attribute_value_crud.delete(db, val_id):
        raise HTTPException(status_code=404, detail="Value not found")


# ---------- Category-Attribute Mapping ----------
@router.get("/category/{category_id}", response_model=List[CategoryAttributeResponse])
def get_category_mappings(category_id: int, db: Session = Depends(get_db)):
    return db.query(CategoryAttribute).filter(
        CategoryAttribute.CategoryId == category_id,
        CategoryAttribute.IsActive == True,
    ).order_by(CategoryAttribute.CategoryAttributeId).all()


@router.post("/category/save", status_code=204)
def save_category_mappings(payload: CategoryAttributeSave, db: Session = Depends(get_db)):
    db.query(CategoryAttribute).filter(
        CategoryAttribute.CategoryId == payload.CategoryId
    ).delete()

    last = db.query(CategoryAttribute).order_by(
        CategoryAttribute.CategoryAttributeId.desc()
    ).first()
    next_id = (last.CategoryAttributeId + 1) if last else 1

    for item in payload.Items:
        db.add(CategoryAttribute(
            CategoryAttributeId=next_id,
            CategoryId=payload.CategoryId,
            AttributeId=item.AttributeId,
            AttributeValueId=item.AttributeValueId,
            IsActive=True,
        ))
        next_id += 1
    db.commit()