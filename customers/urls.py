from django.urls import path

from .views import *

urlpatterns = [
    path('', CustomerListApiView.as_view()),
    path('board', BoardColumnListApiView.as_view()),
    path('board/column/create', BoardColumnCreateApiView.as_view()),
    path('board/column/<int:pk>', BoardColumnRetrieveUpdateDestroyApiView.as_view()),
    path('<int:pk>', CustomerRetrieveUpdateDestroyApiView.as_view()),
]
