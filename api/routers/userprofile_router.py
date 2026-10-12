from typing import Annotated
from fastapi import APIRouter, Depends, Path
from schemas.user_schema import MakeProfileBody, UserModel
from services.userprofile_service import UserProfileService
from dep.supabase import get_supabase, get_user
from services.items_service import ItemsService
router = APIRouter()

@router.post("/profiles/make")
async def make_profile(
    body: MakeProfileBody,
    user: UserModel = Depends(get_user),
    supabase = Depends(get_supabase)
):  
    # Pass the 4 things we have of them off sign up.
    service = UserProfileService(supabase, user.id, body.username, user.email, body.first_name, body.last_name, None)
    return await service.create_default_profile()

@router.post("/profiles")
async def get_user_profile(
    user: UserModel = Depends(get_user),
    supabase = Depends(get_supabase)
):
    service = UserProfileService(supabase, user.id, None, None, None, None, None)
    return await service.get_profile()