from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, SigninTokenObtainPairSerializer
from .utils import get_tokens_for_user

user_model = get_user_model()


class SignUpApiView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)

        response = Response({
            'access': token['access'],
            'refresh': token['refresh'],
            'data': serializer.data,
        })

        return response


class UserApiView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'data': serializer.data})


class SigninTokenObtainPairView(TokenObtainPairView):
    serializer_class = SigninTokenObtainPairSerializer
