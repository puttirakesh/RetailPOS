# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.agent import Agent
from app.schemas.agent import AgentCreate, AgentUpdate


class CRUDAgent(CRUDBase[Agent, AgentCreate, AgentUpdate]):
    def get_by_name(self, db: Session, name: str):
        return db.query(Agent).filter(Agent.AgentName == name.upper()).first()


agent_crud = CRUDAgent(Agent, pk_field="AgentId")