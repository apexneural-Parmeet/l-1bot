from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.db.models import Chat, Message
from app.schemas.chat import ChatSchema
from app.schemas.message import MessageSchema

router = APIRouter()

@router.get("", response_model=List[ChatSchema])
def get_chats(db: Session = Depends(get_db)):
    return db.query(Chat).all()

@router.get("/{chat_id}/messages", response_model=List[MessageSchema])
def get_messages(chat_id: int, db: Session = Depends(get_db)):
    return db.query(Message).filter(Message.chat_id == chat_id).order_by(Message.timestamp).all()
