# Generated by Django 3.2.6 on 2021-10-17 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0011_remove_boardcolumn_unique_is_primary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]