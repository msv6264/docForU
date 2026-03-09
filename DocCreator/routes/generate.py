from fastapi import APIRouter
# importing APIRouter
from models.request_model import DocumentRequest
from services.ppt_service import create_ppt
from services.docx_service import create_docx
from services.pdf_service import create_pdf

router = APIRouter()
# router is an object which stores API endpoints.

@router.post("/genDoc")
# in router APIRouter is imported and here we are using it to create a post request for genDoc end point
async def jsonToDoc(dataJSON, docType):
# func created to convert json to document
    if docType == "ppt":
        return create_ppt(dataJSON)

    # if docType == "docx":
    #     return create_docx(dataJSON)

    # if docType == "pdf":
    #     return create_pdf(dataJSON)