
from rest_framework import viewsets

from ..serializers import ResourceSerializer
from ..models import Resource
from .permissions import IsAdminOrReadOnly

class ResourceViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Resource.objects.all()
  serializer_class = ResourceSerializer
