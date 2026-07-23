from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class StatResponse(BaseModel):
    key: str
    label: str
    value: int
    suffix: Optional[str] = ""

    class Config:
        from_attributes = True
