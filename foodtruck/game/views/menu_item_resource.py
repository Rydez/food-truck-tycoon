
from rest_framework import viewsets

from ..serializers import MenuItemResourceSerializer
from ..models import MenuItemResource
from .permissions import IsAdminOrReadOnly

class MenuItemResourceViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = MenuItemResource.objects.all()
  serializer_class = MenuItemResourceSerializer
