
from rest_framework import viewsets, permissions, filters

from ..serializers import CareerSerializer
from ..models import Career

class IsAdminOrOwner(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.user.is_anonymous:
      return False
    else:
      return True

  def has_object_permission(self, request, view, obj):
    is_admin = bool(request.user and request.user.is_staff)
    is_owner = obj.player == request.user
    return is_admin or is_owner

class IsAdminOrOwnerFilter(filters.BaseFilterBackend):
  def filter_queryset(self, request, queryset, view):
    is_admin = bool(request.user and request.user.is_staff)
    if is_admin:
      return queryset
    else:
      return queryset.filter(player=request.user)

class CareerViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrOwner,)
  filter_backends = (IsAdminOrOwnerFilter,)
  queryset = Career.objects.all()
  serializer_class = CareerSerializer

  def perform_create(self, serializer):
    serializer.save(player=self.request.user)