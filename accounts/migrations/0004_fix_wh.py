from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def move_wh(apps, schema_editor):
    WorkHour = apps.get_model('accounts', 'WorkHour')
    User = apps.get_model('accounts', 'User')
    for user in User.objects.all():
        for wh in WorkHour.objects.all():
            wh.day -= 1
            wh.save()
        # for day in range(0, 7):
        #     WorkHour.objects.update(
        #         day=day,
        #     )


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_workhour'),
    ]

    operations = [
        migrations.RunPython(move_wh),
    ]
