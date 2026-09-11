from app.crud.agent import agent_crud
from app.crud.attribute import attribute_crud, attribute_value_crud
from app.crud.base import CRUDBase
from app.crud.brand import brand_crud
from app.crud.category import category_crud
from app.crud.city import city_crud
from app.crud.customer import customer_crud
from app.crud.group import group_crud
from app.crud.mark import mark_crud
from app.crud.product import product_crud
from app.crud.purchaser import purchaser_crud
from app.crud.salesperson import salesperson_crud
from app.crud.slab import age_slab_crud, price_slab_crud
from app.crud.state import state_crud
from app.crud.supplier import supplier_crud
from app.crud.taxmaster import taxmaster_crud
from app.crud.uom import uom_crud

__all__ = [
    "CRUDBase",
    "age_slab_crud",
    "agent_crud",
    "attribute_crud",
    "attribute_value_crud",
    "brand_crud",
    "category_crud",
    "city_crud",
    "customer_crud",
    "group_crud",
    "mark_crud",
    "price_slab_crud",
    "product_crud",
    "purchaser_crud",
    "salesperson_crud",
    "state_crud",
    "supplier_crud",
    "taxmaster_crud",
    "uom_crud",
]