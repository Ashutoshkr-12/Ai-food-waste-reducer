from fastapi import APIRouter
from app.schemas.scan_schema import ScanResult

router = APIRouter()


@router.post("/")
async def scan_fridge():

    # later AI call here

    return ScanResult(
        ingredients=["milk", "eggs", "spinach"]
    )