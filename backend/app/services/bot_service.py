import asyncio
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
from app.db.session import SessionLocal
from app.db.models import Chat, Message
from app.core.ws_manager import manager
from app.services.llm_service import llm_service
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class TelegramBotService:
    def __init__(self):
        self.application = None

    async def start_bot(self, token: str):
        if self.application:
            await self.stop_bot()
        
        logger.info(f"Starting Telegram bot with token: {token[:10]}...")
        self.application = ApplicationBuilder().token(token).build()
        self.application.add_handler(CommandHandler('start', self.start_cmd))
        self.application.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), self.handle_message))
        
        await self.application.initialize()
        await self.application.start()
        await self.application.updater.start_polling()
        logger.info("Telegram bot is polling.")

    async def stop_bot(self):
        if self.application:
            logger.info("Stopping Telegram bot...")
            await self.application.updater.stop()
            await self.application.stop()
            await self.application.shutdown()
            self.application = None
            logger.info("Telegram bot stopped.")

    async def start_cmd(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        user = update.effective_user
        db = SessionLocal()
        try:
            chat = db.query(Chat).filter(
                Chat.platform == 'telegram', 
                Chat.external_id == str(user.id)
            ).first()
            if not chat:
                chat = Chat(
                    platform='telegram',
                    external_id=str(user.id),
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username
                )
                db.add(chat)
                db.commit()
                db.refresh(chat)
            
            await update.message.reply_text(f"Hi {user.first_name}! I am your assistant.")
        finally:
            db.close()

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        user = update.effective_user
        text = update.message.text
        
        db = SessionLocal()
        try:
            chat = db.query(Chat).filter(
                Chat.platform == 'telegram', 
                Chat.external_id == str(user.id)
            ).first()
            if not chat:
                chat = Chat(
                    platform='telegram',
                    external_id=str(user.id),
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username
                )
                db.add(chat)
                db.commit()
                db.refresh(chat)

            # Save User Message
            user_msg = Message(chat_id=chat.id, sender="user", text=text)
            db.add(user_msg)
            db.commit()
            
            # Notify Frontend
            await manager.broadcast(f"new_message:{chat.id}")

            # Fetch history (last 10 messages)
            history = db.query(Message).filter(Message.chat_id == chat.id).order_by(Message.timestamp.desc()).limit(11).all()
            history.reverse()
            
            # Get AI Response
            response_text = await llm_service.get_response(history)

            await update.message.reply_text(response_text)
            
            # Save Bot Message
            bot_msg = Message(chat_id=chat.id, sender="bot", text=response_text)
            db.add(bot_msg)
            db.commit()

            # Notify Frontend
            await manager.broadcast(f"new_message:{chat.id}")
        finally:
            db.close()

bot_service = TelegramBotService()
