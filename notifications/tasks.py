from django.template.loader import render_to_string
from src.celery import app
from django.core.mail import EmailMultiAlternatives


@app.task
def send_contact_request(data):
    subject = 'BotaBook: У вас новый вопрос!'
    body = render_to_string("notifications/new_request.html", data)
    msg = EmailMultiAlternatives(
        subject=subject,
        to=['anton.botabook@gmail.com']
    )
    msg.attach_alternative(body, "text/html")
    msg.send()
