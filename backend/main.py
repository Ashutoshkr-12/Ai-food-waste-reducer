from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.routes.router import api_router
from app.config.db import engine
from app.models.users import Base
from fastapi.middleware.cors import CORSMiddleware
from app.services.jobs.scheduler import start_scheduler, stop_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    start_scheduler()
    yield

    stop_scheduler()

app = FastAPI(lifespan=lifespan)

origins = ["*"]  # allow all (dev only)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return{"message": "app is running"}

app.include_router(api_router, prefix='/api')