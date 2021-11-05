from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

from accounts.models import Profile
from events.serializers import EventSerializer
from projects.serializers import ProjectSerializer
from customers.serializers import CustomerSerializer, BoardColumnSerializer


class SignupUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    timezone = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'timezone']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(email=validated_data['email'])

        if password is not None:
            instance.set_password(password)

        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.timezone = validated_data['timezone']

        instance.save()
        return instance


class SigninTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': 'Неправильное имя пользователя или пароль'
    }

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        if self.user.is_superuser:
            data['is_superuser'] = self.user.is_superuser

        return data


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'avatar',
            'first_name',
            'last_name',
            'slug',
            'title',
            'phone',
            'company',
            'website',
            'city',
            'country',
            'welcome_text',
            'start_work_hour',
            'end_work_hour',
            'timezone',
            'created_at',
            'updated_at'
        ]

    def get_avatar(self, profile):
        request = self.context['request']
        if profile.avatar != "":
            avatar_url = profile.avatar.url
            return request.build_absolute_uri(avatar_url)


class ProfileUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'title',
            'phone',
            'company',
            'website',
            'city',
            'country',
            'welcome_text',
            'start_work_hour',
            'end_work_hour',
            'timezone'
        ]


class ProfileUpdateAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'avatar'
        ]


class UserRetrieveSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    projects = ProjectSerializer(many=True)
    events = EventSerializer(many=True)
    customers = CustomerSerializer(many=True)
    board_columns = BoardColumnSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'is_verified', 'is_superuser', 'profile', 'events', 'projects', 'customers', 'board_columns']


class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'is_verified', 'is_superuser', 'profile']


class PublicProfileRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'avatar',
            'first_name',
            'last_name',
            'title',
            'phone',
            'company',
            'website',
            'city',
            'country',
            'welcome_text',
            'start_work_hour',
            'end_work_hour',
            'timezone'
        ]

    def get_avatar(self, profile):
        request = self.context['request']
        if profile.avatar != "":
            avatar_url = profile.avatar.url
            return request.build_absolute_uri(avatar_url)


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=1)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)
    uid64 = serializers.CharField(min_length=1, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'uid64', 'token']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            uid64 = attrs.get('uid64')
            token = attrs.get('token')

            id = force_str(urlsafe_base64_decode(uid64))
            user = get_user_model().objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

        except Exception:
            raise AuthenticationFailed('The reset link is invalid', 401)

        return super().validate(attrs)
