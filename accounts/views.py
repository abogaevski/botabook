import uuid

from django.db.models import Q
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.parsers import MultiPartParser, FormParser

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


class SigninTokenObtainPairView(TokenObtainPairView):
    serializer_class = SigninTokenObtainPairSerializer


class UserApiView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserRetrieveSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class ProfileUpdateApiView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return get_object_or_404(Profile, user=user)


class ProfileAvatarUploadApiView(generics.UpdateAPIView):
    serializer_class = ProfileUpdateAvatarSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        user = self.request.user
        return get_object_or_404(Profile, user=user)

    def perform_update(self, serializer):
        instance = self.get_object()
        file = self.request.FILES['avatar']

        ext = file.name.split('.')[-1]
        file_name = '{}.{}.{}'.format(instance.user.id, uuid.uuid4(), ext)
        serializer.validated_data['avatar'].name = file_name
        serializer.save()


class ProfileAvatarRemoveApiView(generics.UpdateAPIView):
    serializer_class = ProfileUpdateAvatarSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return get_object_or_404(Profile, user=user)

    def perform_update(self, serializer):
        instance = self.get_object()
        instance.avatar.delete(save=False)
        instance.save()


class PublicProfileApiView(generics.GenericAPIView):

    def get(self, request, slug):
        profile = get_object_or_404(Profile, slug=slug)
        serializer = PublicProfileRetrieveSerializer(profile, context={'request': request})
        return Response(serializer.data)


class CheckProfileSlugApiView(generics.GenericAPIView):
    def get(self, request, slug):
        user = request.user
        check_profile = Profile.objects.filter(Q(slug=slug), ~Q(user=user))
        if check_profile:
            return Response(False)
        return Response(True)
