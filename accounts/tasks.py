from django.template.loader import render_to_string
from src.celery import app
from django.core.mail import EmailMultiAlternatives


@app.task
def send_request_password_reset_url(to, url):
    subject = 'BotaBook: Сброс пароля'
    body = render_to_string('accounts/email/password_reset_request.html', {'url': url})
    msg = EmailMultiAlternatives(
        subject=subject,
        to=[to]
    )
    msg.attach_alternative(body, "text/html")
    msg.send()


@app.task
def send_email_verification_url(to, name, url):
    subject = 'BotaBook: Подтверждение адреса электронной почты'
    body = render_to_string('accounts/email/email_verify.html', {'url': url, 'name': name})
    msg = EmailMultiAlternatives(
        subject=subject,
        to=[to]
    )
    msg.attach_alternative(body, "text/html")
    msg.send()
