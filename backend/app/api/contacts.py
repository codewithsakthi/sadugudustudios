from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ContactSubmission
from app.schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/contacts", tags=["Contacts"])

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    db_contact = ContactSubmission(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.get("/", response_model=list[ContactResponse])
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(ContactSubmission).offset(skip).limit(limit).all()
