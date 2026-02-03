from fastapi import APIRouter
from app.api.endpoints import config, chats, websocket, webhooks

api_router = APIRouter()

api_router.include_router(config.router, prefix="/config", tags=["config"])
api_router.include_router(chats.router, prefix="/chats", tags=["chats"])
api_router.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])
