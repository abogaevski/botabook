from rest_framework import serializers
from .models import Event
from customers.serializers import CustomerSerializer


class EventSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'end', 'all_day', 'customer']
