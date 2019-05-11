
from rest_framework import viewsets

from ..serializers import MenuItemSerializer
from ..models import MenuItem
from .permissions import IsAdminOrReadOnly

class MenuItemViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = MenuItem.objects.all()
  serializer_class = MenuItemSerializer

  def list(self, request, *args, **kwargs):
    response = super(MenuItemViewSet, self).list(request, *args, **kwargs)
    response.data = { item['id']: item for item in response.data }
    return response
