from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.generate_routes import router as generate_router

app = FastAPI(title="DocForU Unified Backend")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(generate_router)

@app.get("/")
def home():
    return {"message": "FastAPI Unified Backend is working!"}