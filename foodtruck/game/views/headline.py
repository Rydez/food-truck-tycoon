
from rest_framework import viewsets

from ..serializers import HeadlineSerializer
from ..models import Headline
from .permissions import IsAdminOrReadOnly

class HeadlineViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAdminOrReadOnly,)
  queryset = Headline.objects.all()
  serializer_class = HeadlineSerializer

  # def list(self, request, *args, **kwargs):
  #   response = super(HeadlineViewSet, self).list(request, *args, **kwargs)
  #   response.data = { item['id']: item for item in response.data }
  #   return response