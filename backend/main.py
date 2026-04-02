from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.api.routes.router import api_router
from app.config.db import engine
from app.models.users import Base
from fastapi.middleware.cors import CORSMiddleware
from app.services.jobs.scheduler import start_scheduler, stop_scheduler
import os

FRONTEND_URI = os.getenv("FRONTEND_URL","https://ai-food-waste-reducer.vercel.app/")

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    start_scheduler()
    yield

    stop_scheduler()

app = FastAPI(lifespan=lifespan)

origins = [FRONTEND_URI] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print("VALIDATION ERROR:", exc.errors())
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

@app.get('/')
def root():
    return{"message": "app is running"}

app.include_router(api_router, prefix='/api')