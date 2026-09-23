import datetime
from pydantic import BaseModel

class ItemsTable:
    id: str
    owner_id: str
    item_name: str
    item_description: str
    item_type: "lost" | "found"
    image_url: str | None
    longitude: int
    latitude: int
    resolved: bool
    created_at: datetime