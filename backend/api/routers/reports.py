from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import json

from asgiref.sync import sync_to_async
from api.models import Report, Competitor, SearchHistory, User

try:
    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
except ImportError:
    client = None

router = APIRouter(prefix="/api/v1/reports", tags=["reports"])

class DraftRequest(BaseModel):
    role: str

class ShareRequest(BaseModel):
    channels: List[str]

class GenerateReportRequest(BaseModel):
    keyword: str
    user_email: str = "test@bizbeacon.com"  # Hardcoded for now until Auth is wired

# Pydantic schema for OpenAI structured output
class AIReportResponse(BaseModel):
    title: str = Field(description="Catchy title of the report")
    impactScore: float = Field(description="Business impact score from 1.0 to 10.0")
    summary: str = Field(description="Executive summary of the market analysis")
    chartData: List[int] = Field(description="Array of exactly 5 integers representing growth metrics")
    competitors: List[str] = Field(description="List of top 2 competitor company names")

@router.post("/generate")
async def generate_report(req: GenerateReportRequest):
    if not client:
        raise HTTPException(status_code=500, detail="OpenAI client not initialized (missing API key or library)")

    # 1. Call OpenAI
    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            response_format={ "type": "json_object" },
            messages=[
                {"role": "system", "content": "You are a professional B2B Market Analyst. Output JSON matching exactly this schema: {\"title\":\"string\",\"impactScore\":0.0,\"summary\":\"string\",\"chartData\":[0,0,0,0,0],\"competitors\":[\"string\",\"string\"]}"},
                {"role": "user", "content": f"Generate a market intelligence report for the keyword: '{req.keyword}'"}
            ]
        )
        content = response.choices[0].message.content
        ai_data = json.loads(content)
        
        # Validate data
        validated = AIReportResponse(**ai_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Generation failed: {str(e)}")

    # 2. Save to DB using sync_to_async
    @sync_to_async
    def save_data():
        user, _ = User.objects.get_or_create(email=req.user_email, defaults={'name': 'User'})
        # Also log search history
        SearchHistory.objects.create(user=user, keyword=req.keyword, search_type='keyword')
        
        report = Report.objects.create(
            title=validated.title,
            impact_score=validated.impactScore,
            summary=validated.summary,
            chart_data=validated.chartData
        )
        
        for idx, comp in enumerate(validated.competitors):
            level = "High" if idx == 0 else "Medium"
            Competitor.objects.create(report=report, comp_name=comp, threat_level=level)
            
        return report.id

    report_id = await save_data()
    return {"id": str(report_id)}

@router.get("/{report_id}")
async def get_report(report_id: str):
    @sync_to_async
    def get_rep():
        try:
            r = Report.objects.get(id=report_id)
            comps = list(r.competitors.values_list('comp_name', flat=True))
            return r, comps
        except Exception:
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
