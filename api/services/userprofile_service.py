from supabase import Client
class UserProfileService:
    def __init__(self, user_id: str, username: str | None, email: str | None, 
    first_name: str | None, last_name: str | None, phone_number: str | None,
    ):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        
    def create_default_profile(self):
        pass

    def get_profile(self):
        pass

    def update_profile(self):
        pass