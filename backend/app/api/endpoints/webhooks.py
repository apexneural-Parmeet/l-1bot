from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
import logging
from app.db.session import get_db, SessionLocal
from app.db.models import BotConfig, Chat, Message
from app.core.config import settings
from app.services.llm_service import llm_service
from app.services.whatsapp_service import whatsapp_service
from app.core.ws_manager import manager

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/whatsapp")
async def verify_whatsapp(request: Request, db: Session = Depends(get_db)):
    params = request.query_params
    mode = params.get("hub.mode")
    token = params.get("hub.verify_token")
    challenge = params.get("hub.challenge")

    if mode and token:
        config = db.query(BotConfig).filter(BotConfig.platform == settings.WHATSAPP_PLATFORM).first()
        if config and mode == "subscribe" and token == config.verify_token:
            logger.info("WhatsApp Webhook Verified")
            return int(challenge)
    
    raise HTTPException(status_code=403, detail="Verification failed")

@router.post("/whatsapp")
async def handle_whatsapp_webhook(request: Request):
    body = await request.json()
    logger.info(f"WhatsApp Webhook received: {body}")

    try:
        # WhatsApp Webhook structure is deeply nested
        entries = body.get("entry", [])
        for entry in entries:
            changes = entry.get("changes", [])
            for change in changes:
                value = change.get("value", {})
                messages = value.get("messages", [])
                for msg in messages:
                    from_phone = msg.get("from")
                    text = msg.get("text", {}).get("body")
                    
                    if from_phone and text:
                        await process_whatsapp_message(from_phone, text)
    except Exception as e:
        logger.error(f"Error processing WhatsApp webhook: {e}")
    
    return {"status": "ok"}

async def process_whatsapp_message(phone: str, text: str):
    db = SessionLocal()
    try:
        # 1. Get or Create Chat
        chat = db.query(Chat).filter(
            Chat.platform == settings.WHATSAPP_PLATFORM,
            Chat.external_id == phone
        ).first()
        
        if not chat:
            chat = Chat(
                platform=settings.WHATSAPP_PLATFORM,
                external_id=phone,
                first_name=phone # WA doesn't always provide name in simple hook
            )
            db.add(chat)
            db.commit()
            db.refresh(chat)

        # 2. Save User Message
        user_msg = Message(chat_id=chat.id, sender="user", text=text)
        db.add(user_msg)
        db.commit()

        # 3. Notify Frontend
        await manager.broadcast(f"new_message:{chat.id}")

        # 4. Fetch history for AI
        history = db.query(Message).filter(Message.chat_id == chat.id).order_by(Message.timestamp.desc()).limit(11).all()
        history.reverse()

        # 5. Get AI Response
        response_text = await llm_service.get_response(history)

        # 6. Send Reply via WhatsApp
        await whatsapp_service.send_message(phone, response_text)

        # 7. Save Bot Message
        bot_msg = Message(chat_id=chat.id, sender="bot", text=response_text)
        db.add(bot_msg)
        db.commit()

        # 8. Notify Frontend
        await manager.broadcast(f"new_message:{chat.id}")

    finally:
        db.close()
