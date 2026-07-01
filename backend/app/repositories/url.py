from datetime import datetime

from sqlalchemy.orm import Session

from app.models.url import Url


def create(db: Session, original_url: str, created_at: datetime) -> Url:
    url = Url(original_url=original_url, created_at=created_at)
    db.add(url)
    db.flush()
    return url


def set_slug(db: Session, url: Url, slug: str) -> Url:
    url.slug = slug
    db.commit()
    db.refresh(url)
    return url

def get_by_slug(db: Session, slug: str) -> Url | None:
    return db.query(Url).filter(Url.slug == slug).first()