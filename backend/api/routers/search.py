from fastapi import APIRouter
from pydantic import BaseModel
import uuid

from asgiref.sync import sync_to_async
from api.models import SearchHistory

router = APIRouter(prefix="/api/v1/search", tags=["search"])

class SearchRequest(BaseModel):
    keyword: str
    type: str

@router.get("/history")
async def get_search_history():
    @sync_to_async
    def get_histories():
        return list(SearchHistory.objects.order_by('-created_at')[:5].values('id', 'keyword', 'created_at'))
    
    histories = await get_histories()
    return [
        { "id": str(h['id']), "keyword": h['keyword'], "date": h['created_at'].strftime("%Y-%m-%d") }
        for h in histories
    ]

@router.post("")
async def create_search(req: SearchRequest):
    return { "taskId": f"task_{uuid.uuid4().hex[:8]}", "status": "processing" }
