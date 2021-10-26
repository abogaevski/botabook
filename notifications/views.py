from rest_framework import generics
from rest_framework.response import Response

from .tasks import send_contact_request


class PublicContactRequestApiView(generics.GenericAPIView):

    def post(self, request):
        data = request.data
        send_contact_request.delay(data)
        return Response({'success': True})
