from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from src import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/account/', include('accounts.urls')),
    path('api/v1/events/', include('events.urls')),
    path('api/v1/projects/', include('projects.urls')),
    path('api/v1/customers/', include('customers.urls')),
    path('api/v1/notifications/', include('notifications.urls')),
    re_path(r'^webhooks/mail/', include('anymail.urls')),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]