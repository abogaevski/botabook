import pandas as pd
import pytz
from datetime import datetime, timedelta

from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import Profile
from customers.models import Customer
from projects.models import Project
from .models import Event
from .serializers import EventSerializer, EventDatesListSerializer


class EventListApiView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(user=user)


class EventDatesApiView(generics.ListAPIView):
    serializer_class = EventDatesListSerializer

    def get_queryset(self):
        profile = Profile.objects.filter(slug=self.kwargs['slug']).first()
        return Event.objects.filter(user=profile.user)


class EventRetrieveApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(user=user)


class EventApproveApiView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer

    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(Event, pk=pk)


class PublicAvailableTimeApiView(generics.GenericAPIView):

    def get(self, request, slug, date, project_id):
        profile = get_object_or_404(Profile, slug=slug)
        project_range = Project.objects.filter(pk=project_id).first().time_range
        working_hours = profile.working_hours.split('-')
        selected_date = datetime.strptime(date, '%Y-%m-%d')
        time_range = pd.timedelta_range(
            start=working_hours[0],
            end=working_hours[1],
            freq='{}min'.format(project_range)).tolist()
        events = profile.user.events.filter(start__gte=selected_date, is_approved=True)

        time_result = []
        timezone = pytz.timezone(profile.timezone)

        for time in time_range:
            current_time = timezone.localize(selected_date + time)
            time_result.append({'time': current_time, 'status': 'available'})

        for event in events:
            for (index, item) in enumerate(time_result):
                if event.start <= item['time'] < event.end:
                    time_result[index]['status'] = 'busy'

        for (index, t) in enumerate(time_result):
            time_result[index]['time'] = str(t['time'])

        return Response(time_result)


class PublicAddEventApiView(generics.GenericAPIView):

    def post(self, request):
        data = request.data
        project = Project.objects.filter(pk=data['project_id']).first()

        customer, created = Customer.objects.get_or_create(name=data['name'], phone=data['phone'], email=data['email'])
        start_time = datetime.strptime(data['time'], '%Y-%m-%d %H:%M:%S%z')
        title = '{}. {}'.format(customer.name, project.title)

        Event.objects.create(
            title=title,
            start=start_time,
            end=start_time + timedelta(minutes=project.time_range),
            user=project.user,
            project=project,
            customer=customer,
            all_day=False,
            description=data['description']
        )
        return Response({'status': 'ok'})
