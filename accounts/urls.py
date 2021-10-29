from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *

urlpatterns = [
    path('signup', SignUpApiView.as_view(), name='signup_view_url'),
    path('signin', SigninTokenObtainPairView.as_view(), name='signin_token_obtain_pair_url'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user', UserApiView.as_view()),
    path('user/<int:pk>/update', ProfileUpdateApiView.as_view()),
    path('user/<int:pk>/upload-avatar', ProfileAvatarUploadApiView.as_view()),
    path('user/<int:pk>/remove-avatar', ProfileAvatarRemoveApiView.as_view()),
    path('profile/<str:slug>/info', PublicProfileApiView.as_view()),
    path('profile/check-slug/<str:slug>', CheckProfileSlugApiView.as_view()),
    path('request-reset-password', RequestPasswordResetApiView.as_view(), name='request-reset-password'),
    path('reset-password/<uid64>/<token>', PasswordTokenCheckApiView.as_view(), name='reset-password-confirm'),
    path('reset-password-complete', SetNewPasswordApiView.as_view(), name='reset-password-complete'),
    path('verify-email', VerifyEmailApiView.as_view(), name='verify-email'),
    path('request-email-verification', SendVerifyEmailMessage.as_view()),
    path('counter', AdminCountersListApiView.as_view())
]
