from django.db import models


class Event(models.Model):
    class Meta:
        verbose_name = 'Встреча'
        verbose_name_plural = 'Встречи'
        db_table = 'events'

    title = models.CharField(
        max_length=255,
    )
    start = models.DateTimeField()
    end = models.DateTimeField()
    all_day = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
