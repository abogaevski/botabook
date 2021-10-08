from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    event_color = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'start',
            'end',
            'all_day',
            'is_approved',
            'event_color',
            'customer',
            'project',
            'link',
            'description'
        ]

    def get_event_color(self, event):
        return event.project.color


class EventDatesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['start', 'end']
