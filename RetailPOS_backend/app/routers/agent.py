from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.crud.agent import agent_crud
from app.models.agent import Agent
from app.schemas.agent import AgentCreate, AgentUpdate, AgentResponse

router = APIRouter(prefix="/api/agents", tags=["Agents"])


@router.get("/", response_model=List[AgentResponse])
def list_agents(db: Session = Depends(get_db)):
    agents = agent_crud.get_all(db)
    result = []
    for a in agents:
        data = AgentResponse.model_validate(a)
        if a.city:
            data.CityName = a.city.CityName
        result.append(data)
    return result


@router.post("/", response_model=AgentResponse, status_code=201)
def create_agent(payload: AgentCreate, db: Session = Depends(get_db)):
    if agent_crud.get_by_name(db, payload.AgentName.upper()):
        raise HTTPException(status_code=400, detail="Agent name already exists")

    last = db.query(Agent).order_by(Agent.AgentId.desc()).first()
    next_id = (last.AgentId + 1) if last else 1

    data = payload.model_dump()
    data["AgentName"] = data["AgentName"].upper()
    if data.get("Address"):
        data["Address"] = data["Address"].upper()

    obj = Agent(AgentId=next_id, **data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/{agent_id}", response_model=AgentResponse)
def update_agent(agent_id: int, payload: AgentUpdate, db: Session = Depends(get_db)):
    obj = agent_crud.get(db, agent_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Agent not found")

    data = payload.model_dump()
    data["AgentName"] = data["AgentName"].upper()
    if data.get("Address"):
        data["Address"] = data["Address"].upper()

    for k, v in data.items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{agent_id}", status_code=204)
def delete_agent(agent_id: int, db: Session = Depends(get_db)):
    if agent_id == 1:
        raise HTTPException(status_code=400, detail="Agent ID 1 is protected")

    # Check supplier links
    from app.models.supplier import Supplier
    linked = db.query(Supplier).filter(Supplier.AgentId == agent_id).count()
    if linked > 0:
        raise HTTPException(status_code=400, detail="Agent is linked to suppliers")

    if not agent_crud.delete(db, agent_id):
        raise HTTPException(status_code=404, detail="Agent not found")