from django.db import models

from .menu_item import MenuItem
from .location import Location

class Headline(models.Model):
  title = models.CharField(max_length=100, blank=True, default='')
  polarity = models.DecimalField(max_digits=3, decimal_places=2)
  menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
  location = models.ForeignKey(Location, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)

  def __str__(self):
    return self.title