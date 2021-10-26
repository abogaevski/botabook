# Generated by Django 3.2.6 on 2021-10-26 15:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0001_initial'),
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Тема встречи')),
                ('start', models.DateTimeField(verbose_name='Начинается')),
                ('end', models.DateTimeField(verbose_name='Заканчивается')),
                ('all_day', models.BooleanField(default=False, verbose_name='Весь день')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[(0, 0), (1, 1), (2, 2), (3, 3)], default=0, max_length=255)),
                ('link', models.URLField(blank=True, max_length=1000, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='events', to='customers.customer')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='projects.project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Встреча',
                'verbose_name_plural': 'Встречи',
                'db_table': 'events',
            },
        ),
    ]
