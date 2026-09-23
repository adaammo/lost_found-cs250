from fastapi import APIRouter, Depends
from dep.supabase import get_supabase_public
from services.items_service import ItemsService
router = APIRouter()

@router.get("/items")
async def get_items(
    supabase = Depends(get_supabase_public)
):
    service = ItemsService(supabase)
    return service.read_items()