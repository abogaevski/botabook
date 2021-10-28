import pandas as pd
import pytz
from datetime import datetime, timedelta

from django.db.models import Q
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import Profile
from customers.models import Customer, BoardColumn
from projects.models import Project
from .models import Event
from .serializers import EventSerializer, EventDatesListSerializer
from .constants import *
from .tasks import send_approve_status_notification, \
    send_event_link_notification, set_event_reminder, send_successful_booking_notification


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

    def perform_update(self, serializer):
        if 'status' in serializer.validated_data:
            send_approve_status_notification.delay(serializer.instance.id, serializer.validated_data['status'])
            if serializer.validated_data['status'] != 3:
                remind_time = serializer.instance.start - timedelta(hours=1)
                set_event_reminder.apply_async([serializer.instance.id], eta=remind_time)

        if 'link' in serializer.validated_data:
            is_update_link = True
            if serializer.instance.link is None:
                is_update_link = False
            send_event_link_notification.delay(serializer.instance.id, serializer.validated_data['link'], is_update_link)
        serializer.save()


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

        start = pd.to_datetime(
            profile.start_work_hour,
            format='%H:%M'
        ).time().strftime('%H:%M:%S')

        end = pd.to_datetime(
            profile.end_work_hour,
            format='%H:%M'
        ).time().strftime('%H:%M:%S')

        selected_date = datetime.strptime(date, '%Y-%m-%d')
        time_range = pd.timedelta_range(
            start=start,
            end=end,
            freq='{}min'.format(project_range)).tolist()

        events = profile.user.events.filter(Q(start__gte=selected_date), Q(status=APPROVED))

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

        if project is None:
            raise ValidationError('Не найден проект')

        user = project.user
        timezone = pytz.timezone(user.profile.timezone)

        primary_board = BoardColumn.objects.filter(user=project.user, is_primary=True).first()
        if primary_board is None:
            raise ValidationError('Не найдена основная доска клиентов')

        customer = Customer.objects.filter(user=project.user, email=data['email']).first()
        if not customer:
            customer = Customer.objects.create(
                    name=data['name'],
                    phone=data['phone'],
                    email=data['email'],
                    user=user,
                    board_column=primary_board
                )

        if customer is None:
            raise ValidationError('Клиент не создался')

        start_time = datetime.strptime(data['time'], '%Y-%m-%d %H:%M:%S%z')

        event = Event.objects.create(
            title=project.title,
            start=start_time,
            end=start_time + timedelta(minutes=project.time_range),
            user=user,
            project=project,
            customer=customer,
            all_day=False,
            description=data['description']
        )
        if event is None:
            raise ValidationError('Событие не создалось')
        send_successful_booking_notification.delay(event.id)

        return Response({'status': 'ok'})
