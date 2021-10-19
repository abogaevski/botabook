from datetime import datetime
import pytz
from src.celery import app
from .models import Event


@app.task
def update_event_status():
    now = datetime.now()
    for event in Event.objects.all():
        if event.end < pytz.UTC.localize(now):
            status = int(event.status)
            if status == 0:
                event.status = 3
            elif status == 1:
                event.status = 2
            event.save()
