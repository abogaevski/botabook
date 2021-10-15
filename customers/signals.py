from collections import namedtuple

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from .models import BoardColumn
default_boards = [
    {'title': 'Новый', 'is_primary': True, 'color': 'primary'},
    {'title': 'Ожидание оплаты', 'is_primary': False, 'color': 'warning'},
    {'title': 'Подтвержден', 'is_primary': False, 'color': 'success'},
]


@receiver(post_save, sender=get_user_model(), dispatch_uid='create_default_boards')
def create_default_boards(sender, instance, created, **kwargs):
    if created:
        for board in default_boards:
            board_obj = BoardColumn(
                title=board['title'],
                is_primary=board['is_primary'],
                color=board['color'],
                user=instance
            )
            board_obj.save()
