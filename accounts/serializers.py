from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

from accounts.models import Profile


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

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'profile']


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
            'working_hours',
            'timezone'
        ]

    def get_avatar(self, profile):
        request = self.context['request']
        if profile.avatar != "":
            avatar_url = profile.avatar.url
            return request.build_absolute_uri(avatar_url)
