from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.crud.customer import customer_crud
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate, CustomerResponse

router = APIRouter(prefix="/api/customers", tags=["Customers"])


def _enrich(c: Customer) -> CustomerResponse:
    data = CustomerResponse.model_validate(c)
    return data


@router.get("/", response_model=List[CustomerResponse])
def list_customers(search: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Customer)
    if search:
        term = f"%{search}%"
        q = q.filter(
            (Customer.CustomerName.like(term)) |
            (Customer.CustomerCode.like(term)) |
            (Customer.MobileNo.like(term))
        )
    return [_enrich(c) for c in q.order_by(Customer.CustomerId).all()]


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    obj = customer_crud.get(db, customer_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Customer not found")
    return _enrich(obj)


@router.post("/", response_model=CustomerResponse, status_code=201)
def create_customer(payload: CustomerCreate, db: Session = Depends(get_db)):
    if payload.MobileNo and customer_crud.get_by_mobile(db, payload.MobileNo):
        raise HTTPException(status_code=400, detail="Mobile number already exists")

    obj = customer_crud.create_with_auto_code(db, payload)
    return _enrich(obj)


@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(customer_id: int, payload: CustomerUpdate, db: Session = Depends(get_db)):
    obj = customer_crud.get(db, customer_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Customer not found")

    if payload.MobileNo:
        dup = customer_crud.get_by_mobile(db, payload.MobileNo, exclude_id=customer_id)
        if dup:
            raise HTTPException(status_code=400, detail="Mobile number already exists")

    updated = customer_crud.update(db, customer_id, payload)
    return _enrich(updated)


@router.delete("/{customer_id}", status_code=204)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    if not customer_crud.delete(db, customer_id):
        raise HTTPException(status_code=404, detail="Customer not found")