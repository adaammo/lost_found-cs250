from typing import Literal
from pydantic import BaseModel, Field

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

class ItemInsertBody(BaseModel):
    """
    The request body for POST /items/create.
    Field names must match the payload in insertItemReport() (src/lib/fastapiClient.ts),
    otherwise FastAPI rejects the request with a 422 error.
    owner_id, resolved, and created_at are NOT taken from the client; the server fills them in.
    """
    item_name: str = Field(min_length=1)
    item_description: str
    longitude: float
    latitude: float

class AllItemsReturn(BaseModel):
    items: list[ItemsTable]
    profiles: dict[str, ItemsProfileReturn]