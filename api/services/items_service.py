from supabase import Client
from schemas.items_schema import ItemsTable
from fastapi import HTTPException, status
class ItemsService:
    def __init__(self, supabase: Client):
        self.supabase = supabase
    def read_items(self):
        try:
            result = (self.supabase.table("items")
                .select(
                "id,"
                "item_name,"
                "item_description,"
                "item_type,"
                "image_url,"
                "longitude,"
                "latitude,"
                "resolved,"
                "created_at"
            )
                .execute())
            return {
                "items": result.data
            }
        except Exception as e:
            print(str(e))
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Interal Database Error"
            )