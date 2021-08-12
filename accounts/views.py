from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
import jwt

user_model = get_user_model()


class SignUpApiView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SignInApiView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = user_model.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found. Please, Signup')

        if not user.check_password(password):
            raise AuthenticationFailed('Email or password is incorrect')

        payload = {
            'id': user.id,
            'exp': datetime.now() + timedelta(minutes=60),
            'iat': datetime.now()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)

        return response


class UserApiView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Problem')

        user = user_model.objects.filter(id=payload['id']).first()
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
