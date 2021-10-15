# Generated by Django 3.2.6 on 2021-10-14 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_profile_timezone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='timezone',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='welcome_text',
            field=models.TextField(blank=True, null=True),
        ),
    ]
