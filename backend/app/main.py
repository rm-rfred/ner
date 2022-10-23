from fastapi import FastAPI
import uvicorn
from app.api.api import api_router


app = FastAPI()
app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(app)
