
from rest_framework import viewsets

from ..serializers import ResourceSerializer
from ..models import Resource
from .permissions import IsAdminOrReadOnly

class ResourceViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Resource.objects.all()
  serializer_class = ResourceSerializer

  def list(self, request, *args, **kwargs):
    response = super(ResourceViewSet, self).list(request, *args, **kwargs)
    response.data = { item['id']: item for item in response.data }
    return response
