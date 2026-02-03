from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Telegram Bot Backend"
    OPENROUTER_API_KEY: str = "YOUR_OPENROUTER_API_KEY"
    DATABASE_URL: str = "sqlite:///./telegram_bot.db"
    
    # Bot Settings
    TELEGRAM_PLATFORM: str = "telegram"
    WHATSAPP_PLATFORM: str = "whatsapp"
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
