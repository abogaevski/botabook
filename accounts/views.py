from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.parsers import FileUploadParser

from .serializers import *
from .utils import get_tokens_for_user

user_model = get_user_model()


class SignUpApiView(generics.GenericAPIView):
    serializer_class = SignupUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)

        response = Response({
            'access': token['access'],
            'refresh': token['refresh']
        })

        return response


class UserApiView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserRetrieveSerializer(request.user)
        return Response(serializer.data)


class ProfileUpdateApiView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_class = (FileUploadParser,)

    def perform_update(self, serializer):
        avatar = self.request.data['avatar']
        serializer.save(avatar=avatar)

    def get_object(self):
        user = self.request.user
        return get_object_or_404(Profile, user=user)


class SigninTokenObtainPairView(TokenObtainPairView):
    serializer_class = SigninTokenObtainPairSerializer
