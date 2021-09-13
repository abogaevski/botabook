# Generated by Django 3.2.6 on 2021-09-08 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_rename_avatar_profile__avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='_avatar',
            field=models.ImageField(blank=True, default='', upload_to='users/profiles/avatars/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='city',
            field=models.CharField(blank=True, default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='profile',
            name='company',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='profile',
            name='country',
            field=models.CharField(blank=True, default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='profile',
            name='title',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='profile',
            name='website',
            field=models.CharField(blank=True, default='', max_length=32),
        ),
    ]
