from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.db.session import get_db

from app.api.router import router

app = FastAPI()
app.include_router(router)

@app.get('/')
async def root():
    return {"message": "Ok"}

@app.get("/health/db")
def health_db(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok"}