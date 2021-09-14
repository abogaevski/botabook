from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

from accounts.models import Profile


class SignupUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password', 'first_name', 'last_name']
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
    project_count = serializers.SerializerMethodField()

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
            'project_count'
        ]

    def get_avatar(self, profile):
        request = self.context['request']
        if profile.avatar != "":
            avatar_url = profile.avatar.url
            return request.build_absolute_uri(avatar_url)

    def get_project_count(self, profile):
        user = profile.user
        response = {
            'all': user.projects.count(),
            'active': user.projects.filter(is_active=True).count(),
            'disabled': user.projects.filter(is_active=False).count()
        }
        return response


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
