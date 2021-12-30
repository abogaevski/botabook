# Generated by Django 3.2.6 on 2021-12-16 08:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def move_wh(apps, schema_editor):
    Profile = apps.get_model('accounts', 'Profile')
    WorkHour = apps.get_model('accounts', 'WorkHour')
    for profile in Profile.objects.all():
        start_time = profile.start_work_hour
        end_time = profile.end_work_hour

        for day in range(1, 8):
            WorkHour.objects.create(
                user=profile.user,
                day=day,
                start_time=start_time,
                end_time=end_time,
                day_off=False
            )


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_profile_website'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkHour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.PositiveBigIntegerField(choices=[(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday')], verbose_name='Day of week')),
                ('start_time', models.CharField(blank=True, default='09:00', max_length=20, null=True)),
                ('end_time', models.CharField(blank=True, default='18:00', max_length=20, null=True)),
                ('day_off', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='work_hour', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Work hour',
                'verbose_name_plural': 'Work hours',
                'db_table': 'user_work_hours',
            },
        ),
        migrations.RunPython(move_wh),
        migrations.RemoveField(
            model_name='profile',
            name='end_work_hour',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='start_work_hour',
        ),
    ]
