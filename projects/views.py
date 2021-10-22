from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from accounts.models import Profile
from .serializers import *


class ProjectListApiView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user).order_by('-created_at')


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


class PublicProjectListApiView(generics.ListAPIView):
    serializer_class = PublicProjectSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        profile = get_object_or_404(Profile, slug=slug)
        return Project.objects.filter(user=profile.user, is_active=True)


class PublicProjectRetrieveApiView(generics.RetrieveAPIView):
    serializer_class = PublicProjectSerializer

    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(Project, pk=pk)
