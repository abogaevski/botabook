from django.urls import path

from .views import *

urlpatterns = [
    path('', EventListApiView.as_view(), name='events_list_url'),
    path('create', EventCreateApiView.as_view()),
    path('<int:pk>', EventRetrieveApiView.as_view()),
    path('<str:slug>/<int:project_id>/<str:date>', PublicAvailableTimeApiView.as_view()),
    path('event-request', PublicAddEventApiView.as_view())

]