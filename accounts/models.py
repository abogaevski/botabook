from django.contrib.auth.models import AbstractUser
from django.db import models
from django.templatetags.static import static
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField('Email', unique=True)
    username = None
    first_name = None
    last_name = None

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        db_table = 'users'
        swappable = 'AUTH_USER_MODEL'


class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)

    first_name = models.CharField(_('first name'), max_length=150, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    avatar = models.ImageField(upload_to="users/profiles/avatars/", null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=32, null=True, blank=True)

    company = models.CharField(max_length=255, null=True, blank=True)
    website = models.CharField(max_length=32, null=True, blank=True)

    city = models.CharField(max_length=32, null=True, blank=True)
    country = models.CharField(max_length=32, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def get_avatar(self):
        return self.avatar.url if self.avatar else static('/media/avatars/blank.png')

    class Meta:
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')
        db_table = 'user_profiles'
