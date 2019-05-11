from django.contrib.auth import get_user_model

from rest_framework import viewsets, permissions, filters

from ..serializers import PlayerSerializer

class IsAdminOrPlayer(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.user.is_anonymous:
      return False
    else:
      return True

  def has_object_permission(self, request, view, obj):
    is_admin = bool(request.user and request.user.is_staff)
    is_player = obj == request.user
    return is_admin or is_player

class IsAdminOrPlayerFilter(filters.BaseFilterBackend):
  def filter_queryset(self, request, queryset, view):
    is_admin = bool(request.user and request.user.is_staff)
    if is_admin:
      return queryset
    else:
      return queryset.filter(id=request.user.id)

class PlayerViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrPlayer,)
  filter_backends = (IsAdminOrPlayerFilter,)
  Player = get_user_model()
  queryset = Player.objects.all()
  serializer_class = PlayerSerializer
