from rest_framework import serializers
from events.models import Event


# TODO: Create prod serializer with all features for using in client
class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'end']
