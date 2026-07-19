from fastapi import APIRouter

from asgiref.sync import sync_to_async
from api.models import Report, Competitor

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])

@router.get("/summary")
async def get_dashboard_summary():
    @sync_to_async
    def get_data():
        # Get the latest report for trend alert
        report = Report.objects.order_by('-created_at').first()
        comp = Competitor.objects.order_by('-created_at').first()
        return report, comp
    
    report, comp = await get_data()

    return {
        "trendAlert": {
            "title": report.title if report else "No data",
            "description": report.summary if report else "No data"
        },
        "competitorIntel": {
            "title": f"{comp.comp_name} Shift" if comp else "No data",
            "description": f"Threat level: {comp.threat_level}" if comp else "No data"
        },
        "marketSentiment": {
            "title": "Consumer Confidence",
            "description": "Optimistic outlook for Q3 IT spending.",
            "value": "68%"
        }
    }
