from fastapi import APIRouter

from app.api.endpoints import ner

api_router = APIRouter()
api_router.include_router(ner.router, prefix="/ner", tags=["ner"])
