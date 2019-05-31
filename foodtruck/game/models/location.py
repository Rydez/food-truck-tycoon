from django.db import models
from django_mysql.models import Model, JSONField

class Location(Model):
  name = models.CharField(max_length=100, blank=True, default='')
  cost = models.DecimalField(max_digits=8, decimal_places=2, default=0)
  created = models.DateTimeField(auto_now_add=True)
  popularity = models.DecimalField(max_digits=8, decimal_places=2, default=0)
  keywords = JSONField()
  truck_position = JSONField()

  class Meta:
    ordering = ('created',)

  def __str__(self):
    return self.name