from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from asgiref.sync import sync_to_async
from api.models import Report, Competitor

router = APIRouter(prefix="/api/v1/reports", tags=["reports"])

class DraftRequest(BaseModel):
    role: str

class ShareRequest(BaseModel):
    channels: List[str]

@router.get("/{report_id}")
async def get_report(report_id: str):
    @sync_to_async
    def get_rep():
        # Just grab the latest for demo if report_id=1, else handle properly
        r = Report.objects.order_by('-created_at').first()
        if r:
            comps = list(r.competitors.values_list('comp_name', flat=True))
            return r, comps
        return None, []

    r, comps = await get_rep()
    
    if r:
        return {
            "title": r.title,
            "impactScore": float(r.impact_score),
            "summary": r.summary,
            "chartData": r.chart_data or [10, 20, 30, 45, 60],
            "competitors": comps
        }
    
    return {
        "title": "Not Found",
        "impactScore": 0,
        "summary": "Report not found.",
        "chartData": [],
        "competitors": []
    }

@router.post("/{report_id}/draft")
async def create_draft(report_id: str, req: DraftRequest):
    return { "draftId": "d_123", "content": f"Draft for {req.role}:\nBased on the analysis..." }

@router.post("/{report_id}/share")
async def share_report(report_id: str, req: ShareRequest):
    return { "success": True }
