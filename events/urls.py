from django.urls import path
from .views import RetrieveEventApiView

urlpatterns = [
    path('', RetrieveEventApiView.as_view(), name='retrieve_events'),
]