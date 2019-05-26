from django.db import models
from .resource import Resource
from .equipment import Equipment

class MenuItem(models.Model):
  name = models.CharField(max_length=100, blank=True, default='')
  created = models.DateTimeField(auto_now_add=True)
  resources = models.ManyToManyField(Resource, through='MenuItemResource')
  equipment = models.ManyToManyField(Equipment, through='MenuItemEquipment')
  popularity = models.DecimalField(max_digits=8, decimal_places=2, default=0)

  class Meta:
    ordering = ('created',)

  def __str__(self):
    return self.name