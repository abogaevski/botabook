from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Service
from .serializers import ServiceSerializer


class ServiceListApiView(generics.ListAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(user=self.request.user)


class ServiceCreateApiView(generics.CreateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ServiceRetrieveUpdateDestroyApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceSerializer

    def get_queryset(self):
        user = self.request.user
        return Service.objects.filter(user=user)

