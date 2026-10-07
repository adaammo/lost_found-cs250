from pydantic import BaseModel
from typing import Optional
class UserModel(BaseModel):
    id: str
    aud: str
    role: Optional[str] = None
    email: Optional[str] = None
    email_confirmed_at: Optional[str] = None
    phone: Optional[str] = None
    phone_confirmed_at: Optional[str] = None
    confirmed_at: Optional[str] = None
    last_sign_in_at: Optional[str] = None
    created_at: str
    updated_at: str
    is_anonymous: bool = False