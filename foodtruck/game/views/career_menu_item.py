from rest_framework import viewsets, permissions

from ..serializers import CareerMenuItemSerializer
from ..models import CareerMenuItem, Career, MenuItem
from .permissions import IsAdminOrCareerOwner, IsAdminOrCareerOwnerFilter

class HasRequiredCareerEquipment(permissions.BasePermission):
  def has_permission(self, request, view):
    if 'career' not in request.data or 'menu_item' not in request.data:
      return False

    career_id = request.data['career']
    career_equipment = Career.objects.get(id=career_id).equipment.all()
    career_equipment_ids = [e.id for e in career_equipment]

    menu_item_id = request.data['menu_item']
    required_equipment = MenuItem.objects.get(id=menu_item_id).equipment.all()
    required_equipment_ids = [e.id for e in required_equipment]

    for required_equipment_id in required_equipment_ids:
      if required_equipment_id not in career_equipment_ids:
        return False

    return True

class CareerMenuItemViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrCareerOwner, HasRequiredCareerEquipment,)
  filter_backends = (IsAdminOrCareerOwnerFilter,)
  queryset = CareerMenuItem.objects.all()
  serializer_class = CareerMenuItemSerializer