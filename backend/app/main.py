import os

from fastapi import FastAPI

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import engine
from app.models import user

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)


@app.on_event("startup")
async def startup() -> None:
    if not os.path.exists(settings.DATABASE_NAME):
        async with engine.begin() as conn:
            await conn.run_sync(user.Base.metadata.create_all)


app.include_router(api_router, prefix=settings.API_V1_STR)
