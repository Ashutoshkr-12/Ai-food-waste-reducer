from apscheduler.schedulers.asyncio import AsyncIOScheduler
from jobs.expiry_job import mark_expired_items

scheduler = AsyncIOScheduler()

def start_schedular():

    scheduler.add_job(
        mark_expired_items,
        "interval",
        minutes=10
    )

    scheduler.start()

def stop_scheduler():
    scheduler.shutdown()