from django.contrib.auth import get_user_model
from django.db import models
from core.constants import *


class Project(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    time_range = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    color = models.CharField(max_length=255, choices=COLORS, default=PRIMARY)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='projects')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        db_table = 'projects'
        ordering = ['-pk']
