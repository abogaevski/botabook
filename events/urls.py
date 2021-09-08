from django.urls import path
from .views import EventListApiView, EventCreateApiView, EventRetrieveApiView

urlpatterns = [
    path('', EventListApiView.as_view(), name='events_list_url'),
    path('create', EventCreateApiView.as_view()),
    path('<int:pk>', EventRetrieveApiView.as_view())
]
