from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from rest_framework.authtoken.models import Token

from .models import User, Profile


@receiver(post_save, sender=User, dispatch_uid='save_new_user_profile')
def save_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile(
            user=instance,
            first_name=instance.first_name,
            last_name=instance.last_name,
            slug=slugify(instance.email.split('@')[0]),
            timezone=instance.timezone
        )
        profile.save()


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
