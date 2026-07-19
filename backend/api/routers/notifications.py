from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/v1/notifications", tags=["notifications"])

class ReadRequest(BaseModel):
    notificationIds: List[str]

@router.get("")
async def get_notifications():
    return [
        { "id": "n1", "type": "alert", "message": "Impact score for Retail AI increased to 9.2", "read": False }
    ]

@router.patch("/read")
async def mark_read(req: ReadRequest):
    return { "success": True }
