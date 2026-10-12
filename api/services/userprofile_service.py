from supabase import Client
from fastapi import HTTPException, status

from schemas.user_schema import UserDatabaseProfile

class UserProfileService:
    
    # Usually in most functions every none will be none since they will only matter on profile updates
    def __init__(self, supabase: Client, user_id: str, username: str | None, email: str | None, 
    first_name: str | None, last_name: str | None, phone_number: str | None,
    ):  
        self.supabase = supabase
        self.user_id = user_id
        self.username = username
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
    
    """
    This functions creates a profile for the database where the passed JWT->user_id is stored as a FK, and filled with fake information.
    """
    async def create_default_profile(self):
        try:
            payload = {
                    "user_id" : self.user_id,
                    "username": self.username,
                    "username": self.username,
                    "email": self.email,
                    "first_name": self.first_name,
                    "last_name": self.last_name,
                    "phone_number": None,}
            
            (self.supabase.table("profiles")
                      .insert(payload)
                      .execute())
            return {
                "ok": True,
                "detail": "Profile made."
            }
            
        except Exception as e: 
            raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "Something went wrong trying to insert your profile."
        )
            
    """
    This functions gets a profile from the database where the passed JWT->user_id is checked against the table.
    """
    async def get_profile(self) -> UserDatabaseProfile | None:
        try:
            # call profiles table where id = id
            data = (self.supabase
            .table("profiles")
            .select("*")
            .eq("user_id", self.user_id)
            .execute()
            )
            if not data:
                return
            # return as pydantic model
            return UserDatabaseProfile(**data.data[0])
        except Exception as e:
            print(e)
            raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "Something went wrong trying to get your profile."
        )

    def update_profile(self):
        pass