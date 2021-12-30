from django.utils.translation import gettext_lazy as _

PRIMARY = 'primary'
SUCCESS = 'success'
DANGER = 'danger'
INFO = 'info'
WARNING = 'warning'
DARK = 'dark'
COLORS = [
    (PRIMARY, 'primary'),
    (SUCCESS, 'success'),
    (DANGER, 'danger'),
    (INFO, 'info'),
    (WARNING, 'warning'),
    (DARK, 'dark'),
]

DOW_CHOICES = (
    (0, _('Monday')),
    (1, _('Tuesday')),
    (2, _('Wednesday')),
    (3, _('Thursday')),
    (4, _('Friday')),
    (5, _('Saturday')),
    (6, _('Sunday')),
)