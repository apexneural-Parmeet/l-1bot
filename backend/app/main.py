import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api.api import api_router
from app.api.endpoints.websocket import router as ws_router
from app.core.config import settings
from app.db.session import SessionLocal, engine
from app.db.models import Base, BotConfig
from app.services.bot_service import bot_service
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Check for existing token on startup
    db = SessionLocal()
    try:
        config = db.query(BotConfig).filter(BotConfig.platform == settings.TELEGRAM_PLATFORM).first()
        if config and config.token:
            asyncio.create_task(bot_service.start_bot(config.token))
    finally:
        db.close()
    
    yield
    
    # Shutdown
    await bot_service.stop_bot()

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(api_router)
app.include_router(ws_router) # Mounts the websocket endpoint

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
