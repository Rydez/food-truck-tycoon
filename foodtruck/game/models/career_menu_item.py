from django.db import models
from .career import Career
from .menu_item import MenuItem

class CareerMenuItem(models.Model):
  career = models.ForeignKey(
    Career,
    related_name='career_menu_items',
    on_delete=models.CASCADE
  )
  menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)