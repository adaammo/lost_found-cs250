from pydantic import BaseModel, Field
from typing import Optional


class MakeProfileBody(BaseModel):
    username: str = Field(max_length=15)
    first_name: str
    last_name: str | None = None


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

class UserDatabaseProfile(BaseModel):
    id: str
    user_id: str
    created_at: str
    username: str
    first_name: str
    last_name: str | None
    phone_number: str | None
    email: str
    
class ItemsProfileReturn(BaseModel):
    id: str
    user_id: str
    username: str
    first_name: str | None
    last_name: str | None
    email: str
    phone_number: str | None