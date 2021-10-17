from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import UniqueConstraint, Q
from core.constants import *


class Customer(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=100)
    email = models.EmailField()

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='customers')
    board_column = models.ForeignKey('BoardColumn', on_delete=models.PROTECT, related_name='customers')
    board_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'
        db_table = 'customers'

    def __str__(self):
        return self.name


class BoardColumn(models.Model):
    title = models.CharField(max_length=255)
    color = models.CharField(max_length=255, choices=COLORS, default=PRIMARY)
    is_primary = models.BooleanField(default=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='boards')

    class Meta:
        verbose_name = 'BoardColumn'
        verbose_name_plural = 'BoardColumns'
        db_table = 'user_customers_boards'
        # constraints = [
        #     UniqueConstraint(
        #         fields=['is_primary'],
        #         condition=Q(is_primary=True),
        #         name='unique_is_primary')
        # ]

    def __str__(self):
        return self.title
