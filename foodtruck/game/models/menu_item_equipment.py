from django.db import models
from .menu_item import MenuItem
from .equipment import Equipment

class MenuItemEquipment(models.Model):
  menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
  equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)