from fastapi import APIRouter, Depends
from schemas.items_schema import AllItemsReturn, ItemInsertBody, ItemsTable
from schemas.user_schema import UserModel
from dep.supabase import get_supabase, get_supabase_public, get_user
from services.items_service import ItemsService
router = APIRouter()

@router.get("/items", response_model=AllItemsReturn)
async def get_items(
    supabase = Depends(get_supabase_public)
):
    service = ItemsService(supabase)
    return service.read_items()

"""
Creates a new item report for the logged-in user.
get_user checks the Authorization header (401 if missing/invalid),
get_supabase gives a client that acts as that user (so RLS rules apply).
"""
@router.post("/items/create", response_model=ItemsTable, status_code=201)
async def insert_item(
    body: ItemInsertBody,
    user: UserModel = Depends(get_user),
    supabase = Depends(get_supabase)
):
    service = ItemsService(supabase)
    return service.insert_item(body, user.id)
