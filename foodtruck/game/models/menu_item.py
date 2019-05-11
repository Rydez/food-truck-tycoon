from django.db import models
from .resource import Resource
from .equipment import Equipment

class MenuItem(models.Model):
  name = models.CharField(max_length=100, blank=True, default='')
  created = models.DateTimeField(auto_now_add=True)
  resources = models.ManyToManyField(Resource, through='MenuItemResource')
  equipment = models.ManyToManyField(Equipment, through='MenuItemEquipment')

  class Meta:
    ordering = ('created',)

  def __str__(self):
    return self.name