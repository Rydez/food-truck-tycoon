from django.db import models
from django.contrib.auth import get_user_model
from .resource import Resource
from .menu_item import MenuItem
from .equipment import Equipment

Player = get_user_model()

class Career(models.Model):
  name = models.CharField(max_length=100, blank=True, default='')
  created = models.DateTimeField(auto_now_add=True)
  player = models.ForeignKey(Player, related_name='careers', on_delete=models.CASCADE)
  cash = models.DecimalField(max_digits=8, decimal_places=2, default=0)
  resources = models.ManyToManyField(Resource, through='CareerResource')
  menu_items = models.ManyToManyField(MenuItem, through='CareerMenuItem')
  equipment = models.ManyToManyField(Equipment, through='CareerEquipment')

  class Meta:
    ordering = ('created',)