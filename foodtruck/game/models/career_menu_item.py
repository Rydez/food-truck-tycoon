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
  price = models.DecimalField(max_digits=8, decimal_places=2, blank=True)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):
    is_new = self.id is None
    if is_new:
      menu_item_cost = 0
      for menu_item_resource in self.menu_item.menu_item_resources.all():
        menu_item_cost += menu_item_resource.quantity * menu_item_resource.resource.cost

      self.price = 3 * menu_item_cost

    super(CareerMenuItem, self).save(*args, **kwargs)
