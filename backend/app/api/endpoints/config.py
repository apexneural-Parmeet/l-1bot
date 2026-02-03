from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import BotConfig
from app.schemas.bot import BotConfigSchema, BotConfigBase
from app.services.bot_service import bot_service
import asyncio

router = APIRouter()

@router.get("/{platform}", response_model=BotConfigBase)
def get_config(platform: str, db: Session = Depends(get_db)):
    config = db.query(BotConfig).filter(BotConfig.platform == platform).first()
    if not config:
        return {"platform": platform, "token": ""}
    return config

@router.post("")
async def save_config(config_data: BotConfigBase, db: Session = Depends(get_db)):
    config = db.query(BotConfig).filter(BotConfig.platform == config_data.platform).first()
    if config:
        config.token = config_data.token
        config.verify_token = config_data.verify_token
        config.phone_number_id = config_data.phone_number_id
    else:
        config = BotConfig(
            platform=config_data.platform, 
            token=config_data.token,
            verify_token=config_data.verify_token,
            phone_number_id=config_data.phone_number_id
        )
        db.add(config)
    db.commit()
    
    if config_data.platform == 'telegram' and config_data.token:
        # Start or restart the bot
        asyncio.create_task(bot_service.start_bot(config_data.token))
        
    return {"status": "success", "message": f"Config for {config_data.platform} saved."}
