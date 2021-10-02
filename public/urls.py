from django.urls import path
from .views import PublicInfoApiView

urlpatterns = [
    path('<str:slug>', PublicInfoApiView.as_view())
]