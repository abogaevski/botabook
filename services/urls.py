from django.urls import path
from .views import *

urlpatterns = [
    path('', ServiceListApiView.as_view()),
    path('create', ServiceCreateApiView.as_view()),
    path('<int:pk>', ServiceRetrieveUpdateDestroyApiView.as_view()),
]
