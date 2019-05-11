
from rest_framework import viewsets

from ..serializers import MenuItemEquipmentSerializer
from ..models import MenuItemEquipment
from .permissions import IsAdminOrReadOnly

class MenuItemEquipmentViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = MenuItemEquipment.objects.all()
  serializer_class = MenuItemEquipmentSerializer
