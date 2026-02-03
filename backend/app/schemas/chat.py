from pydantic import BaseModel
from typing import Optional

class ChatBase(BaseModel):
    platform: str
    external_id: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None

class ChatCreate(ChatBase):
    pass

class ChatSchema(ChatBase):
    id: int

    class Config:
        from_attributes = True
