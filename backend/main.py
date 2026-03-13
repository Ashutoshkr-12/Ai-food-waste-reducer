from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.routes.router import api_router
from app.config.db import engine
from app.models.user import Base

from app.api.routes.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(api_router, prefix='/api')