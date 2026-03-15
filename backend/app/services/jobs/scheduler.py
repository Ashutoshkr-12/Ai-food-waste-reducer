from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.jobs.expiry_job import mark_expired_items

scheduler = AsyncIOScheduler()

def start_scheduler():

    scheduler.add_job(
        mark_expired_items,
        "interval",
        minutes=10
    )

    scheduler.start()

def stop_scheduler():
    scheduler.shutdown()