from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Project
from .serializers import ProjectSerializer


class ProjectListApiView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)


class ProjectCreateApiView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectRetrieveUpdateDestroyApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(user=user)

