from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from services.ppt_service import create_ppt

app = FastAPI()

class docRequest(BaseModel):
    dataJSON: str
    docType: str

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}

@app.post("/genDoc")
def genDoc(req: docRequest):

    import json

    print(req.docType)
    print(req.dataJSON)
    print("fastAPI received data")

    data = json.loads(req.dataJSON)

    if req.docType == "Presentation":
        file_path = create_ppt(data)


    return {
        "status": "success",
        "received_type": "req.docType",
        "message": "Document data received by Python!"
    }