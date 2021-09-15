from django.contrib.auth import get_user_model
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    description = models.TextField()
    time_range = models.PositiveIntegerField()

    is_active = models.BooleanField(default=True)
    # status

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='projects')

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        db_table = 'projects'