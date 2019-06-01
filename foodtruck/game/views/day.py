
from rest_framework import viewsets

from ..serializers import DaySerializer
from ..models import Day
from .permissions import IsAdminOrCareerOwner, IsAdminOrCareerOwnerFilter

class DayViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrCareerOwner,)
  filter_backends = (IsAdminOrCareerOwnerFilter,)
  queryset = Day.objects.all()
  serializer_class = DaySerializer

  # def get_serializer_class(self):
  #   if self.request.user.is_staff:
  #       return AdminDaySerializer
  #   return DaySerializer
