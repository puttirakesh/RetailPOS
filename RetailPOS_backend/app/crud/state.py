from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.state import State
from app.schemas.state import StateResponse


class CRUDState(CRUDBase):
    pass


state_crud = CRUDState(State, pk_field="StateId")