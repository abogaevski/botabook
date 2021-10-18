# Generated by Django 3.2.6 on 2021-10-17 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_profile_welcome_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='working_hours',
        ),
        migrations.AddField(
            model_name='profile',
            name='end_work_hour',
            field=models.CharField(default='18:00', max_length=20),
        ),
        migrations.AddField(
            model_name='profile',
            name='start_work_hour',
            field=models.CharField(default='09:00', max_length=20),
        ),
    ]