from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    chat_id: int
    sender: str
    text: str

class MessageCreate(MessageBase):
    pass

class MessageSchema(MessageBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
