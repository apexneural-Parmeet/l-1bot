from pydantic import BaseModel

class BotConfigBase(BaseModel):
    platform: str
    token: str
    verify_token: str | None = None
    phone_number_id: str | None = None

class BotConfigCreate(BotConfigBase):
    pass

class BotConfigSchema(BotConfigBase):
    id: int
    is_active: int

    class Config:
        from_attributes = True

class BotConfigUpdate(BaseModel):
    token: str | None = None
    verify_token: str | None = None
    phone_number_id: str | None = None
    is_active: int | None = None
