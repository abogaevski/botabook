from django.urls import path

from .views import *

urlpatterns = [
    path('', CustomerListApiView.as_view()),
    path('create', CustomerCreateApiView.as_view())
]