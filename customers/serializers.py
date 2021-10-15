import random
from rest_framework import serializers
from customers.models import *

customer_colors = ['primary', 'success', 'danger', 'info', 'warning', 'dark']


class CustomerSerializer(serializers.ModelSerializer):
    color = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = [
            'id',
            'name',
            'phone',
            'email',
            'color',
            'initials',
            'created_at',
            'board_column',
            'board_order',
            'events'
        ]

    def get_initials(self, customer):
        return customer.name[0].upper()

    def get_color(self, customer):
        return random.choice(customer_colors)


class BoardColumnSerializer(serializers.ModelSerializer):
    customers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = BoardColumn
        fields = ['id', 'title', 'customers', 'is_primary', 'color']
