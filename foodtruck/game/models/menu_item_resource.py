from django.db import models
from .menu_item import MenuItem
from .resource import Resource

class MenuItemResource(models.Model):
  menu_item = models.ForeignKey(
    MenuItem,
    related_name='menu_item_resources',
    on_delete=models.CASCADE
  )
  resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
  quantity = models.DecimalField(max_digits=8, decimal_places=2, default=0)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)