import random
from rest_framework import serializers
from customers.models import Customer

customer_colors = ['primary', 'success', 'danger', 'info', 'warning', 'dark']


class CustomerSerializer(serializers.ModelSerializer):
    color = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone', 'email', 'color', 'initials', 'created_at']

    def get_initials(self, customer):
        return customer.name[0].upper()

    def get_color(self, customer):
        return random.choice(customer_colors)
