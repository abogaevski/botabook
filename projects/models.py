from django.contrib.auth import get_user_model
from django.db import models


class Project(models.Model):
    PRIMARY = 'primary'
    SUCCESS = 'success'
    DANGER = 'danger'
    INFO = 'info'
    WARNING = 'warning'
    DARK = 'dark'
    COLORS = [
        (PRIMARY, 'primary'),
        (SUCCESS, 'success'),
        (DANGER, 'danger'),
        (INFO, 'info'),
        (WARNING, 'warning'),
        (DARK, 'dark'),
    ]

    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    description = models.TextField(null=True, blank=True)
    time_range = models.PositiveIntegerField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    color = models.CharField(max_length=255, choices=COLORS, default=PRIMARY)

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='projects')

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        db_table = 'projects'
