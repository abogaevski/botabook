from datetime import datetime, timedelta
import jwt
from rest_framework.exceptions import AuthenticationFailed


def encode_jwt(user_id, response):
    payload = {
        'id': user_id,
        'exp': datetime.now() + timedelta(minutes=60),
        'iat': datetime.now()
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response.set_cookie(key='jwt', value=token, httponly=True)
    return response


def decode_jwt(token):
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Problem')

    return payload
