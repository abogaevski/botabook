from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

from .utils import encode_jwt, decode_jwt

user_model = get_user_model()


# TODO: Пересмотреть авторизацию по токенам!!!!
class SignUpApiView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response(serializer.data)
        encode_jwt(user_id=serializer.data['id'], response=response)

        return response


class SignInApiView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = user_model.objects.filter(email=email).first()
        serializer = UserSerializer(user)

        if user is None:
            raise AuthenticationFailed('Пользователь не найден, пожалуйста зарегистрируйтесь')

        if not user.check_password(password):
            raise AuthenticationFailed('Email или пароль указаны неверно. Повторите попытку.')

        response = Response(serializer.data)
        encode_jwt(user_id=user.id, response=response)

        return response


class UserApiView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        payload = decode_jwt(token)

        user = user_model.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('Что-то пошло не так. Перевойдите в систему.')
        serializer = UserSerializer(user)

        return Response(serializer.data)


class SignOutApiView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
