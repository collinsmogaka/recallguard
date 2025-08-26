from fastapi import FastAPI

app = FastAPI(title="RecallGuard API")

@app.get("/")
async def root():
    return {"status": "ok", "message": "Welcome to RecallGuard 🚀"}
