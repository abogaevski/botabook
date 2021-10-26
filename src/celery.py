import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

app = Celery('botabook')
app.config_from_object('django.conf:settings')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'update-event-status-every-30-minutes': {
        'task': 'events.tasks.update_event_status',
        'schedule': crontab(minute='*/30')
    },
}