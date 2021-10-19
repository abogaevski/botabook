# BotaBook
## Getting started
### Requirements

    redis - for celery queue
    celery -A src beat
    celery -A src worker --loglevel=debug --concurrency=4


