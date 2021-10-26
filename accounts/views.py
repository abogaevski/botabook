import uuid

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.db.models import Q
from django.urls import reverse
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import *
from .tasks import send_request_password_reset_url
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


class RequestPasswordResetApiView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        if user_model.objects.filter(email=email).exists():
            user = user_model.objects.get(email=email)
            uid64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            relative_link = '/reset-password/{}/{}'.format(uid64, token)
            url = 'http://localhost:8080' + relative_link
            send_request_password_reset_url.delay(user.email, url)
        return Response({'success': 'Confirmation link have been sent to email'})


class PasswordTokenCheckApiView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetSerializer

    def get(self, request, uid64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uid64))
            user = user_model.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Provided token is not valid'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success': True, 'message': 'Token is valid', 'uid64': uid64, 'token': token},
                            status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Provided token is not valid'}, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordApiView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password have been reset'}, status=status.HTTP_200_OK)
