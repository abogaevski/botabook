from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class AccountUserManager(UserManager):

    def _create_user(self, username, email, password, **extra_fields):

        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField('Email', unique=True)
    username = None
    first_name = None
    last_name = None
    is_verified = models.BooleanField(default=False)

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    objects = AccountUserManager()

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
    welcome_text = models.TextField(blank=True, null=True, default='')

    company = models.CharField(max_length=255, blank=True, default='')
    website = models.CharField(max_length=32, blank=True, default='')

    city = models.CharField(max_length=32, blank=True, default='')
    country = models.CharField(max_length=32, blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    slug = models.SlugField(unique=True)

    start_work_hour = models.CharField(max_length=20, default='09:00')
    end_work_hour = models.CharField(max_length=20, default='18:00')
    timezone = models.CharField(max_length=255, blank=True, null=True)

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
