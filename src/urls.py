from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from src import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/account/', include('accounts.urls')),
    path('api/v1/events/', include('events.urls')),
    path('api/v1/projects/', include('projects.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
