from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from customers.serializers import *


class CustomerListApiView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Customer.objects.filter(user=user)


class CustomerRetrieveUpdateDestroyApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def get_queryset(self):
        user = self.request.user
        return Customer.objects.filter(user=user)


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

    def perform_update(self, serializer):
        data = self.request.data
        if 'is_primary' in data:
            primary = self.get_queryset().filter(is_primary=True).first()
            primary.is_primary = False
            primary.save()
        serializer.save()

    def perform_destroy(self, instance):
        if instance.is_primary:
            raise ValidationError({'detail': 'Нельзя удалять основную колонку'})
        if instance.customers.count() != 0:
            primary_column = self.get_queryset().filter(is_primary=True).first()
            for c in instance.customers.all():
                c.board_column = primary_column
                c.save()
        instance.delete()
