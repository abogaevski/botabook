from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import SignUpApiView, UserApiView, SigninTokenObtainPairView

urlpatterns = [
    path('/signup', SignUpApiView.as_view(), name='signup_view_url'),
    path('/signin', SigninTokenObtainPairView.as_view(), name='signin_token_obtain_pair_url'),
    path('/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('/user', UserApiView.as_view()),
]
