from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User, Profile


@receiver(post_save, sender=User, dispatch_uid='save_new_user_profile')
def save_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile(
            user=instance,
            first_name=instance.first_name,
            last_name=instance.last_name
        )
        profile.save()
