
from rest_framework import viewsets

from ..serializers import TruckSerializer
from ..models import Truck
from .permissions import IsAdminOrReadOnly

class TruckViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Truck.objects.all()
  serializer_class = TruckSerializer

  def list(self, request, *args, **kwargs):
    response = super(TruckViewSet, self).list(request, *args, **kwargs)
    response.data = { item['id']: item for item in response.data }
    return response