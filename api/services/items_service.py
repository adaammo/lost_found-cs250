from supabase import Client
from schemas.user_schema import ItemsProfileReturn
from schemas.items_schema import AllItemsReturn
from fastapi import HTTPException, status
class ItemsService:
    def __init__(self, supabase: Client):
        self.supabase = supabase
    def read_items(self):
        try:
            # firts query the items table for 
            result = (self.supabase.table("items")
                .select("*")
                .execute()
                )
            rows = result.data
            # result.data is a list of dicts. use list comprehension to selectt the id in every row.
            user_ids: list[str] = [row["owner_id"] for row in rows]
            # now query profiles. The reason you need to do this seperatly is because if you looped a database call, you would force an N + 1 queries.
            # Which is very very bad for something you could optimize
            
            #SQL equivalant of select these where user_id in list
            profiles = (self.supabase.table("profiles")
                    .select("id, user_id, username, first_name, last_name, email, phone_number")
                    .in_("user_id", user_ids)
                    .execute()
                    )
            # now do a dict comprehension for a structured return type
            
            profiles_by_user_id = {
                # row is a dict so its ** to unpack.
                row["user_id"]: ItemsProfileReturn(**row)
                for row in profiles.data
            }
            return AllItemsReturn(
                items=result.data,
                profiles=profiles_by_user_id
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Interal Database Error"
            )