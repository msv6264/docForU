from fastapi import FastAPI
from pydantic import BaseModel
from services.ppt_service import create_ppt
from services.docx_service import create_docx
from fastapi.responses import StreamingResponse

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class docRequest(BaseModel):
    dataJSON: str
    docType: str

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}

@app.post("/genDoc")
def genDoc(req: docRequest):

    import json
    data = json.loads(req.dataJSON)

    if req.docType.lower() == "presentation":
        file_stream = create_ppt(data)
        file_name = "presentation.pptx"
        media_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation"

    elif req.docType.lower() == "document":
        file_stream = create_docx(data)
        file_name = "document.docx"
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    else:
        return {"error": "Invalid docType"}

    return StreamingResponse(
        file_stream,
        media_type=media_type,
        headers={
            "Content-Disposition": f"attachment; filename={file_name}"
        }
    )