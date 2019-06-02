
from rest_framework import viewsets

from ..serializers import SaleSerializer
from ..models import Sale
from .permissions import IsAdminOrReadOnly

class SaleViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Sale.objects.all()
  serializer_class = SaleSerializer
