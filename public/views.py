import json
from collections import namedtuple
from datetime import datetime

from rest_framework import generics
from rest_framework.response import Response

from accounts.models import Profile
from .serializers import PublicInfoSerializer

PublicInfo = namedtuple(
    'PublicInfo', ('profile', 'projects', 'events')
)


class PublicInfoApiView(generics.GenericAPIView):

    def get(self, request, slug):
        profile = Profile.objects.filter(slug=slug).first()
        projects = profile.user.projects.all()
        events = profile.user.events.all()

        info = PublicInfo(profile=profile, projects=projects, events=events)
        serializer = PublicInfoSerializer(info)

        return Response(serializer.data)
