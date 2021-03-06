from rest_framework import viewsets, permissions

from ..serializers import CareerEquipmentSerializer
from ..models import CareerEquipment, Equipment, Career
from .permissions import IsAdminOrCareerOwner, IsAdminOrCareerOwnerFilter


class CanAffordEquipment(permissions.BasePermission):
  def has_permission(self, request, view):
    if 'career' not in request.data or 'equipment' not in request.data:
      return False

    career_id = request.data['career']
    career_cash = Career.objects.get(id=career_id).cash

    equipment_id = request.data['equipment']
    equipment_cost = Equipment.objects.get(id=equipment_id).cost

    if career_cash < equipment_cost:
      return False

    return True


class DoesntAlreadyOwnEquipment(permissions.BasePermission):
  def has_permission(self, request, view):
    if 'career' not in request.data or 'equipment' not in request.data:
      return False

    career_id = request.data['career']
    career_equipment = Career.objects.get(id=career_id).equipment.all()

    equipment_id = request.data['equipment']

    for equipment in career_equipment:
      if equipment.id == equipment_id:
        return False

    return True


class CareerEquipmentViewSet(viewsets.ModelViewSet):
  permission_classes = (
    IsAdminOrCareerOwner,
    CanAffordEquipment,
    DoesntAlreadyOwnEquipment,
  )

  filter_backends = (IsAdminOrCareerOwnerFilter,)
  queryset = CareerEquipment.objects.all()
  serializer_class = CareerEquipmentSerializer
