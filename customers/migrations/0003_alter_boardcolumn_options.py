# Generated by Django 3.2.6 on 2021-11-10 12:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_alter_boardcolumn_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='boardcolumn',
            options={'ordering': ['pk'], 'verbose_name': 'BoardColumn', 'verbose_name_plural': 'BoardColumns'},
        ),
    ]
