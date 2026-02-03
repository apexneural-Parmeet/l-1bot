import httpx
import logging
from app.db.session import SessionLocal
from app.db.models import BotConfig
from app.core.config import settings

logger = logging.getLogger(__name__)

class WhatsAppService:
    def __init__(self):
        self.api_version = "v18.0"
        self.base_url = f"https://graph.facebook.com/{self.api_version}"

    async def send_message(self, to_phone: str, text: str):
        db = SessionLocal()
        try:
            config = db.query(BotConfig).filter(BotConfig.platform == settings.WHATSAPP_PLATFORM).first()
            if not config or not config.token or not config.phone_number_id:
                logger.error("WhatsApp config missing (token or phone_number_id)")
                return False

            url = f"{self.base_url}/{config.phone_number_id}/messages"
            headers = {
                "Authorization": f"Bearer {config.token}",
                "Content-Type": "application/json",
            }
            payload = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": to_phone,
                "type": "text",
                "text": {"preview_url": False, "body": text},
            }

            async with httpx.AsyncClient() as client:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code != 200:
                    logger.error(f"WhatsApp API Error: {response.text}")
                    return False
                return True
        finally:
            db.close()

whatsapp_service = WhatsAppService()
