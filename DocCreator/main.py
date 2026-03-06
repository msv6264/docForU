from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}

@app.get("/test")
def test():
    return {"status": "success"}