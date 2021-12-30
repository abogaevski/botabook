from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from projects.models import Project
from .models import User, Profile, WorkHour
from core.constants import PRIMARY, DOW_CHOICES


@receiver(post_save, sender=User, dispatch_uid='save_new_user_profile')
def save_profile(sender, instance, created, **kwargs):
    if created:

        default_slug = instance.email.split('@')[0]
        counter = 1
        while Profile.objects.filter(slug=default_slug):
            default_slug = default_slug + str(counter)
            counter += 1

        profile = Profile(
            user=instance,
            first_name=instance.first_name,
            last_name=instance.last_name,
            slug=default_slug,
            timezone=instance.timezone
        )
        profile.save()


@receiver(post_save, sender=User, dispatch_uid='save_work_hour')
def save_work_hour(sender, instance, created, **kwargs):
    if created:
        for day in DOW_CHOICES:
            day_wh = WorkHour(
                user=instance,
                day=day[0],
                start_time='09:00',
                end_time='18:00',
                day_off=False
            )
            if day[0] >= 5:
                day_wh.start_time = None
                day_wh.end_time = None
                day_wh.day_off = True

            day_wh.save()


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=User)
def create_initial_project(sender, instance=None, created=False, **kwargs):
    if created:
        Project.objects.create(
            title='Бесплатная встреча на пол часа',
            description='Эта встреча предназначена для предварительной связи со мной.',
            price=0,
            time_range=30,
            is_active=True,
            color=PRIMARY,
            user=instance
        )
