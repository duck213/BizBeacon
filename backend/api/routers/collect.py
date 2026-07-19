from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/collect", tags=["collect"])

class TriggerRequest(BaseModel):
    domain: str

@router.post("/trigger")
async def trigger_collection(req: TriggerRequest):
    return { "status": "started" }

@router.post("/ocr")
async def process_ocr(image: UploadFile = File(...)):
    return { "text": "Extracted sample text", "extractedEntities": ["Acme Corp", "2024 Q3"] }
