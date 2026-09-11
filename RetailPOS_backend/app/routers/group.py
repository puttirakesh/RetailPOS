from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.group import group_crud
from app.schemas.group import GroupCreate, GroupUpdate, GroupResponse

router = APIRouter(prefix="/api/groups", tags=["Groups"])


@router.get("/", response_model=List[GroupResponse])
def list_groups(db: Session = Depends(get_db)):
    return group_crud.get_all(db)


@router.post("/", response_model=GroupResponse, status_code=201)
def create_group(payload: GroupCreate, db: Session = Depends(get_db)):
    if group_crud.get_by_name(db, payload.GroupName.upper()):
        raise HTTPException(status_code=400, detail="Group name already exists")
    return group_crud.create_with_auto_code(db, payload)


@router.put("/{group_id}", response_model=GroupResponse)
def update_group(group_id: int, payload: GroupUpdate, db: Session = Depends(get_db)):
    obj = group_crud.update(db, group_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Group not found")
    return obj


@router.delete("/{group_id}", status_code=204)
def delete_group(group_id: int, db: Session = Depends(get_db)):
    # Block delete if categories reference this group
    from app.models.category import Category
    linked = db.query(Category).filter(Category.GroupId == group_id, Category.IsActive == True).count()
    if linked > 0:
        raise HTTPException(status_code=400, detail="Categories are linked to this group")
    if not group_crud.delete(db, group_id):
        raise HTTPException(status_code=404, detail="Group not found")