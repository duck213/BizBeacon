from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/v1/users", tags=["users"])

class Preferences(BaseModel):
    emailDaily: Optional[bool] = None
    slackAlerts: Optional[bool] = None

class ProfileUpdate(BaseModel):
    preferences: Preferences

@router.get("/profile")
async def get_profile():
    return {
        "name": "John Doe",
        "role": "Marketing",
        "preferences": {
            "emailDaily": True,
            "slackAlerts": False
        }
    }

@router.put("/profile")
async def update_profile(req: ProfileUpdate):
    return {
        "success": True,
        "user": {
            "name": "John Doe",
            "role": "Marketing",
            "preferences": req.preferences.dict(exclude_none=True)
        }
    }
