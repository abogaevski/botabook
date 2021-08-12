from django.urls import include, path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt


# from api.viewsets import EventViewSet

router = routers.DefaultRouter()
# router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls), name='api'),
]
