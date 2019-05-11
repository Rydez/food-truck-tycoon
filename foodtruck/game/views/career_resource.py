from rest_framework import viewsets

from ..serializers import CareerResourceSerializer
from ..models import CareerResource
from .permissions import IsAdminOrCareerOwner, IsAdminOrCareerOwnerFilter

class CareerResourceViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrCareerOwner,)
  filter_backends = (IsAdminOrCareerOwnerFilter,)
  queryset = CareerResource.objects.all()
  serializer_class = CareerResourceSerializer
