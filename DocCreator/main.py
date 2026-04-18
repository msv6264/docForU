from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from controllers.generateController import processData

load_dotenv()
FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI()
origins = [
    FRONTEND_URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],       
)

@app.post("/generate")
async def printData(req: Request):
    data = await req.json()
    processData(data)
    return {"status": "ok"}