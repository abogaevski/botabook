from django.contrib.auth import get_user_model
from django.db import models

from customers.models import Customer
from projects.models import Project
from .constants import *


class Event(models.Model):
    STATUSES = [
        (NEW, 0),
        (APPROVED, 1),
        (COMPLETED, 2),
        (CANCELED, 3),
    ]

    class Meta:
        verbose_name = 'Встреча'
        verbose_name_plural = 'Встречи'
        db_table = 'events'

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='events',
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='events',
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.SET_NULL,
        related_name='events',
        null=True
    )

    title = models.CharField('Тема встречи', max_length=255)
    start = models.DateTimeField('Начинается', )
    end = models.DateTimeField('Заканчивается')
    all_day = models.BooleanField('Весь день', default=False)
    created_at = models.DateTimeField(auto_now=True)

    status = models.CharField(max_length=255, choices=STATUSES, default=NEW)

    link = models.URLField(max_length=1000, blank=True, null=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title
