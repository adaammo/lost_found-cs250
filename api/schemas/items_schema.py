from typing import Literal
from pydantic import BaseModel

from schemas.user_schema import ItemsProfileReturn

class ItemsTable(BaseModel):
    id: str
    owner_id: str
    item_name: str
    item_description: str
    item_type: Literal["lost", "found"]
    image_url: str | None
    longitude: float
    latitude: float
    resolved: bool
    created_at: str

class AllItemsReturn(BaseModel):
    items: list[ItemsTable]
    profiles: dict[str, ItemsProfileReturn]