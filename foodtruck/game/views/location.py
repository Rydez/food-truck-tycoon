
from rest_framework import viewsets

from ..serializers import LocationSerializer
from ..models import Location
from .permissions import IsAdminOrReadOnly

class LocationViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Location.objects.all()
  serializer_class = LocationSerializer

  def list(self, request, *args, **kwargs):
    response = super(LocationViewSet, self).list(request, *args, **kwargs)
    response.data = { item['id']: item for item in response.data }
    return response