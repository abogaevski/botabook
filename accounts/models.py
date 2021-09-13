from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.templatetags.static import static
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
    avatar = models.ImageField(upload_to='users/profiles/avatars/', null=True, blank=True)
    title = models.CharField(max_length=255, blank=True, default='')
    phone = models.CharField(max_length=32, blank=True, default='')

    company = models.CharField(max_length=255, blank=True, default='')
    website = models.CharField(max_length=32, blank=True, default='')

    city = models.CharField(max_length=32, blank=True, default='')
    country = models.CharField(max_length=32, blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    #
    # @property
    # def avatar_url(self):
    #     # TODO: Static here static(avatar_url)
    #     return self.avatar.url if self.avatar else ''

    def save(self, *args, **kwargs):
        try:
            this = Profile.objects.get(id=self.id)
            if this.avatar != self.avatar:
                this.avatar.delete(save=False)
        except:
            pass
        super(Profile, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')
        db_table = 'user_profiles'
