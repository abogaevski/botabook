from rest_framework import serializers

from accounts.serializers import PublicProfileRetrieveSerializer
from projects.serializers import PublicProjectSerializer
from events.serializers import EventDatesListSerializer


class PublicInfoSerializer(serializers.Serializer):
    profile = PublicProfileRetrieveSerializer()
    projects = PublicProjectSerializer(many=True)
    events = EventDatesListSerializer(many=True)

    class Meta:
        fields = ['profile', 'projects', 'events']
