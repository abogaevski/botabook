from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
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

        data['data'] = UserSerializer(self.user).data
        return data
