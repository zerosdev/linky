from fastapi import APIRouter

from app.api import url, auth

router = APIRouter(prefix="/api")

router.include_router(url.router)
router.include_router(auth.router)
