from django.db import models
from .career import Career
from .resource import Resource

class CareerResource(models.Model):
  career = models.ForeignKey(Career, on_delete=models.CASCADE)
  resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
  quantity = models.DecimalField(max_digits=8, decimal_places=2, default=0)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)