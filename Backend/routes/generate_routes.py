from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from controllers.generate_controller import handle_generate_doc, handle_process_file

router = APIRouter()

class DocGenerationRequest(BaseModel):
    docData: dict

@router.post("/generate")
async def generate_document(req: DocGenerationRequest):
    return await handle_generate_doc(req.docData)

@router.post("/process")
async def process_file(file: UploadFile = File(...), topicName: str = Form(...)):
    return await handle_process_file(file, topicName)

# Legacy support
@router.post("/genDoc")
async def legacy_gen_doc(req: dict):
    # For legacy support, we can still use the controller but may need to adapt input
    import json
    data = json.loads(req.get("dataJSON", "{}"))
    return await handle_generate_doc(data)
