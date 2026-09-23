from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv("dev.env")

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_ANON_KEY")
# users client - not used yet
_supabase_client = create_client(url, key)
# public reads - no admin control nessseary
_public_client = create_client(url, key) 

def get_supabase_public() -> Client:
    return _public_client