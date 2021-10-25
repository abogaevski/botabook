from django.urls import path
from .views import *

urlpatterns = [
    path('contact-request', PublicContactRequestApiView.as_view())
]
