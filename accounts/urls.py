from django.urls import path
from .views import SignUpApiView, SignInApiView, UserApiView, SignOutApiView

urlpatterns = [
    path('signup', SignUpApiView.as_view()),
    path('signin', SignInApiView.as_view()),
    path('user', UserApiView.as_view()),
    path('signout', SignOutApiView.as_view())
]