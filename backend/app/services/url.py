from datetime import datetime, timezone

from hashids import Hashids
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.url import Url
from app.repositories import url as url_repository

hashids = Hashids(salt=settings.hashids_salt, min_length=settings.hashids_min_length)


def create_short_url(db: Session, original_url: str) -> Url:
    url = url_repository.create(
        db, original_url=original_url, created_at=datetime.now(timezone.utc)
    )
    slug = hashids.encode(url.id)
    return url_repository.set_slug(db, url, slug)

def get_short_url(db: Session, slug: str) -> Url:
    url = url_repository.get_by_slug(db, slug)
    if not url:
        raise ValueError("URL not found")
    return url