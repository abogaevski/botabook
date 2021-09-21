from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from customers.serializers import CustomerSerializer


class CustomerListApiView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Customer.objects.all()


class CustomerCreateApiView(generics.CreateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
