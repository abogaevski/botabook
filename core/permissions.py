from rest_framework import permissions


class IsOwnerOrSuperuser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return bool(request.user == obj.user or request.user.is_superuser)
