from rest_framework import serializers

from customers.models import Customer
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    events = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    customers = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'price',
            'is_active',
            'time_range',
            'color',
            'events',
            'customers',
            'created_at'
        ]

    def get_customers(self, project):
        return list(Customer.objects.filter(events__project=project).distinct().values_list('id', flat=True))


class PublicProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'price',
            'time_range',
            'color'
        ]
