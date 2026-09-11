from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.state import State
from app.schemas.state import StateResponse

router = APIRouter(prefix="/api/states", tags=["States"])


@router.get("/", response_model=List[StateResponse])
def list_states(db: Session = Depends(get_db)):
    return db.query(State).order_by(State.StateName).all()


@router.get("/{state_id}", response_model=StateResponse)
def get_state(state_id: int, db: Session = Depends(get_db)):
    obj = db.query(State).filter(State.StateId == state_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="State not found")
    return obj