from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi import Header, HTTPException, status
import os
from schemas.user_schema import UserModel

ENV = os.getenv("APP_ENV", "development")
if ENV == "development":
    load_dotenv("dev.env")

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_ANON_KEY")
# users client - not used yet
_supabase_client = create_client(url, key)
# public reads - no admin control nessseary
_public_client = create_client(url, key) 
async def get_user(auth: str | None = Header(default=None, alias="Authorization")) -> UserModel:
    if auth is None or "undefined" in auth:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You tried to do something only a verifed user is capabale of doing. If this is incorrect please log out and log back in to fix it."
        )
    # remove Bearer
    try:
        token = str((auth.split(" ", 1)[1]))
        user = _supabase_client.auth.get_user(token)
        return UserModel(
            id=user.user.id,
            aud=user.user.aud,
            role=user.user.role,
            email=user.user.email,
            email_confirmed_at=str(user.user.email_confirmed_at),
            created_at=str(user.user.created_at),
            updated_at=str(user.user.updated_at),
            is_anonymous=user.user.is_anonymous or False
        )
    except Exception as e:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Invalid Token")

# THIS IS THE USERS SUPABASE. WE USE A HEADER PASSED WITH THEIR JWT REMOVE BEARERE AND RETURN THEIR AUTHORIZED CLIENT
# _public_client is an unauthenthicated variable, this helps with RLS issues
def get_supabase(authorization: str | None = Header(default=None, alias="Authorization")):
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token.")
    token = authorization.replace("Bearer ", "")
    _supabase_client.postgrest.auth(token)
    return _supabase_client

def get_supabase_public() -> Client:
    return _public_client