
from rest_framework import viewsets, permissions, filters

from ..serializers import CareerSerializer
from ..models import Career, Location, Truck

class IsAdminOrOwner(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.user.is_anonymous:
      return False
    else:
      return True

  def has_object_permission(self, request, view, obj):
    is_admin = bool(request.user and request.user.is_staff)
    is_owner = obj.player == request.user
    editing_cash = False
    if 'cash' in request.data:
      editing_cash = True

    return is_admin or (is_owner and not editing_cash)

class IsAdminOrOwnerFilter(filters.BaseFilterBackend):
  def filter_queryset(self, request, queryset, view):
    is_admin = bool(request.user and request.user.is_staff)
    if is_admin:
      return queryset
    else:
      return queryset.filter(player=request.user)


class CanRentLocation(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    if 'location' not in request.data:
      return True

    # Location is already owned
    if obj.location.id == request.data['location']:
      return False

    location = Location.objects.get(id=request.data['location'])
    if obj.cash < location.cost:
      return False

    return True


class CanBuyTruck(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    if 'truck' not in request.data:
      return True

    # Truck is already owned
    if obj.truck.id == request.data['truck']:
      return False

    old_truck = obj.truck
    new_truck = Truck.objects.get(id=request.data['truck'])

    cost = new_truck.cost - old_truck.cost
    if cost > 0 and obj.cash < cost:
      return False

    return True


class CareerViewSet(viewsets.ModelViewSet):
  permission_classes = (
    IsAdminOrOwner,
    CanRentLocation,
    CanBuyTruck,
  )
  filter_backends = (IsAdminOrOwnerFilter,)
  queryset = Career.objects.all()
  serializer_class = CareerSerializer

  def perform_create(self, serializer):
    serializer.save(player=self.request.user)