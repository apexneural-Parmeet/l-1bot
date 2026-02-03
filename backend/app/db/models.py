from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class BotConfig(Base):
    __tablename__ = "bot_configs"
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, unique=True, index=True) # 'telegram', 'whatsapp', 'instagram'
    token = Column(String) # Access Token
    verify_token = Column(String, nullable=True) # For Webhooks (WhatsApp/IG)
    phone_number_id = Column(String, nullable=True) # WhatsApp specific
    is_active = Column(Integer, default=1)

class Chat(Base):
    __tablename__ = "chats"
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, index=True, default='telegram')
    external_id = Column(String, index=True) # TG user ID, WA phone, IG ID
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    username = Column(String, nullable=True)

    __table_args__ = (UniqueConstraint('platform', 'external_id', name='_platform_external_id_uc'),)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id"))
    sender = Column(String)  # 'user' or 'bot'
    text = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
