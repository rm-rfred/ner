from fastapi import FastAPI, APIRouter
import uvicorn
from api.api import api_router

root_router = APIRouter()
app = FastAPI(title="NER API", openapi_url="/openapi.json")
app.include_router(api_router)


@root_router.get("/", status_code=200)
def root(
) -> dict:
    """
    Root GET
    """
    return (
        {"msg": "Hello World"})


if __name__ == "__main__":
    uvicorn.run(app)
