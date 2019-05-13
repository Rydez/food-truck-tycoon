
from rest_framework import viewsets

from ..serializers import EquipmentSerializer
from ..models import Equipment
from .permissions import IsAdminOrReadOnly

class EquipmentViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Equipment.objects.all()
  serializer_class = EquipmentSerializer

  def list(self, request, *args, **kwargs):
    response = super(EquipmentViewSet, self).list(request, *args, **kwargs)
    response.data = { item['id']: item for item in response.data }
    return response