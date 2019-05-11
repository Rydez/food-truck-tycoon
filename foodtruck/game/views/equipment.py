
from rest_framework import viewsets

from ..serializers import EquipmentSerializer
from ..models import Equipment
from .permissions import IsAdminOrReadOnly

class EquipmentViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Equipment.objects.all()
  serializer_class = EquipmentSerializer
