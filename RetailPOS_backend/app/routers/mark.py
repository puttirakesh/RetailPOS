from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.mark import mark_crud
from app.schemas.mark import MarkCreate, MarkUpdate, MarkResponse

router = APIRouter(prefix="/api/marks", tags=["Marks"])


@router.get("/", response_model=List[MarkResponse])
def list_marks(db: Session = Depends(get_db)):
    return mark_crud.get_all(db)


@router.post("/", response_model=MarkResponse, status_code=201)
def create_mark(payload: MarkCreate, db: Session = Depends(get_db)):
    return mark_crud.create_with_auto_code(db, payload)


@router.put("/{mark_id}", response_model=MarkResponse)
def update_mark(mark_id: int, payload: MarkUpdate, db: Session = Depends(get_db)):
    obj = mark_crud.update(db, mark_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Mark not found")
    return obj


@router.delete("/{mark_id}", status_code=204)
def delete_mark(mark_id: int, db: Session = Depends(get_db)):
    if mark_id == 1:
        raise HTTPException(status_code=400, detail="Mark ID 1 is protected")
    if not mark_crud.delete(db, mark_id):
        raise HTTPException(status_code=404, detail="Mark not found")