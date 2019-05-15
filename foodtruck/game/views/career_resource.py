from rest_framework import viewsets, permissions

from ..serializers import CareerResourceSerializer
from ..models import CareerResource, Career, Resource
from .permissions import IsAdminOrCareerOwner, IsAdminOrCareerOwnerFilter


class CanAffordResources(permissions.BasePermission):
  def has_permission(self, request, view):
    if (
      'career' not in request.data or
      'resource' not in request.data or
      'quantity' not in request.data
    ):
      return False

    career_id = request.data['career']
    career_cash = Career.objects.get(id=career_id).cash

    resource_id = request.data['resource']
    resource_cost = Resource.objects.get(id=resource_id).cost

    quantity = request.data['quantity']

    if career_cash < (resource_cost * quantity):
      return False

    return True


class CareerResourceViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrCareerOwner, CanAffordResources,)
  filter_backends = (IsAdminOrCareerOwnerFilter,)
  queryset = CareerResource.objects.all()
  serializer_class = CareerResourceSerializer
