from datetime import datetime
import pytz
from django.conf import settings
from django.template.loader import render_to_string

from src.celery import app
from .models import Event
from django.core.mail import EmailMultiAlternatives


@app.task
def update_event_status():
    now = datetime.now()
    for event in Event.objects.all():
        if event.end < pytz.UTC.localize(now):
            status = int(event.status)
            if status == 0:
                event.status = 3
            elif status == 1:
                event.status = 2
            event.save()


@app.task
def send_successful_booking_notification(event_id):
    event = Event.objects.filter(pk=event_id).first()
    tz = pytz.timezone(event.user.profile.timezone)
    user_values = {
        'email': event.user.email,
        'name': event.user.profile.first_name,
        'c_name': event.customer.name,
        'project': event.project.title,
        'time': event.start.astimezone(tz).strftime(format='%d.%m.%Y %H:%M'),
        'url': settings.FRONTEND_URL + '/calendar',
        'message': event.description
    }
    customer_values = {
        'email': event.customer.email,
        'name': event.customer.name,
        'project': event.project.title,
        'u_name': event.user.profile.first_name,
        'time': event.start.astimezone(tz).strftime(format='%d.%m.%Y %H:%M'),
        'message': event.description
    }
    _send_successful_booking_notification_to_user(user_values)
    _send_successful_booking_notification_to_customer(customer_values)


@app.task
def send_approve_status_notification(event_id, status):
    subject = ''
    try:
        event = Event.objects.filter(pk=event_id).first()
        tz = pytz.timezone(event.user.profile.timezone)
        values = {
            'name': event.customer.name,
            'email': event.customer.email,
            'u_name': event.user.profile.first_name,
            'time': event.start.astimezone(tz).strftime(format='%d.%m.%Y %H:%M'),
            'status': status,
            'url': '{}/{}'.format(settings.FRONTEND_URL, event.user.profile.slug),
            'message': event.description,
            'project': event.project.title
        }
        if status == 1:
            subject = 'BotaBook: {} подтвердил(-a) свое присутствие на Вашей встрече'.format(event.user.profile.first_name)
        if status == 3:
            subject = 'BotaBook: {} отклонил(-a) Вашу заявку на встречу'.format(event.user.profile.first_name)

        body = render_to_string('events/email/customer/update_status.html', values)
        send_notification(subject, body, event.customer.email)
    except:
        print('Event does not exist')


@app.task
def send_event_link_notification(event_id, link, is_update):
    event = Event.objects.filter(pk=event_id).first()
    tz = pytz.timezone(event.user.profile.timezone)
    values = {
        'name': event.customer.name,
        'email': event.customer.email,
        'u_name': event.user.profile.first_name,
        'time': event.start.astimezone(tz).strftime(format='%d.%m.%Y %H:%M'),
        'url': link,
        'message': event.description,
        'project': event.project.title,
        'update_link': True if event.link is not None else False
    }

    subject = 'BotaBook: {} добавил(-а) ссылку на вашу встречу'.format(event.user.profile.first_name)
    if is_update:
        subject = 'BotaBook: {} изменил(-а) ссылку на вашу встречу'.format(event.user.profile.first_name)

    body = render_to_string('events/email/customer/event_link.html', values)
    send_notification(subject, body, event.customer.email)


@app.task
def set_event_reminder(event_id):
    try:
        event = Event.objects.filter(pk=event_id).first()
        tz = pytz.timezone(event.user.profile.timezone)
        customer_values = {
            'name': event.customer.name,
            'email': event.customer.email,
            'u_name': event.user.profile.first_name,
            'time': event.start.astimezone(tz).strftime(format='%d.%m.%Y %H:%M'),
            'duration': event.project.time_range,
            'url': event.link,
            'message': event.description,
            'project': event.project.title,
        }
        user_values = {
            'name': event.user.profile.first_name,
            'email': event.user.email,
            'c_name': event.customer.name,
            'c_email': event.customer.email,
            'c_phone': event.customer.phone,
            'time': event.start.astimezone(tz).strftime(format='%d.%m.%Y %H:%M'),
            'duration': event.project.time_range,
            'url': event.link,
            'message': event.description,
            'project': event.project.title,
        }
        _set_event_reminder_for_customer(customer_values)
        _set_event_reminder_for_user(user_values)
    except:
        print('Error: SOMETHING HAPPENED')


def _send_successful_booking_notification_to_user(values):
    subject = 'BotaBook: У вас новая заявка на встречу!'
    body = render_to_string("events/email/user/successful_booking.html", values)
    send_notification(subject, body, values['email'])


def _send_successful_booking_notification_to_customer(values):
    subject = 'BotaBook: Ваша заявка на встречу принята!'
    body = render_to_string('events/email/customer/successful_booking.html', values)
    send_notification(subject, body, values['email'])


def _set_event_reminder_for_customer(values):
    subject = 'BotaBook: Напомнинание. Ваша встреча состоится через час!'
    body = render_to_string('events/email/customer/remind_event.html', values)
    send_notification(subject, body, values['email'])


def _set_event_reminder_for_user(values):
    subject = 'BotaBook: Напомнинание. Через час у вас состоится встреча!'
    body = render_to_string('events/email/user/remind_event.html', values)
    send_notification(subject, body, values['email'])


def send_notification(subject, body, to):
    msg = EmailMultiAlternatives(
        subject=subject,
        to=[to]
    )
    msg.attach_alternative(body, "text/html")
    msg.send()
