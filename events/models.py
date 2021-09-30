from django.contrib.auth import get_user_model
from django.db import models

from projects.models import Project


class Event(models.Model):
    class Meta:
        verbose_name = 'Встреча'
        verbose_name_plural = 'Встречи'
        db_table = 'events'

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='events',
        blank=True,
        null=True
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='events'
    )

    title = models.CharField('Тема встречи', max_length=255)
    start = models.DateTimeField('Начинается', )
    end = models.DateTimeField('Заканчивается')
    all_day = models.BooleanField('Весь день', default=False)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
