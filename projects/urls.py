from django.urls import path
from .views import *

urlpatterns = [
    path('', ProjectListApiView.as_view()),
    path('create', ProjectCreateApiView.as_view()),
    path('<int:pk>', ProjectRetrieveUpdateDestroyApiView.as_view()),
    path('profile/<str:slug>/projects', PublicProjectListApiView.as_view()),
    path('profile/<str:slug>/<int:pk>', PublicProjectRetrieveApiView.as_view())
]
