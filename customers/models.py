from django.db import models

from events.models import Event


class Customer(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=100)
    email = models.EmailField()

    event = models.OneToOneField(
        Event,
        on_delete=models.CASCADE,
        related_name='customer'
    )

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'
        db_table = 'customers'

    def __str__(self):
        return self.name
