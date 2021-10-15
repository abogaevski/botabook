from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from customers.serializers import *


class CustomerListApiView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Customer.objects.filter(events__project__user=user)


class CustomerRetrieveUpdateDestroyApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def get_queryset(self):
        user = self.request.user
        return Customer.objects.filter(events__project__user=user)


class BoardColumnListApiView(generics.ListAPIView):
    serializer_class = BoardColumnSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BoardColumn.objects.filter(user=user)


class BoardColumnCreateApiView(generics.CreateAPIView):
    serializer_class = BoardColumnSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BoardColumnRetrieveUpdateDestroyApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BoardColumnSerializer

    def get_queryset(self):
        user = self.request.user
        return BoardColumn.objects.filter(user=user)
