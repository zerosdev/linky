from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.url import CreateUrlRequest, UrlResponse
from app.services import url as url_service

router = APIRouter(prefix="/urls", tags=["urls"])


@router.post("/", response_model=UrlResponse)
def create_short_url(body: CreateUrlRequest, db: Session = Depends(get_db)):
    return url_service.create_short_url(db, original_url=str(body.original_url))
