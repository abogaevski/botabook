from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'
        db_table = 'customers'

    def __str__(self):
        return self.name
