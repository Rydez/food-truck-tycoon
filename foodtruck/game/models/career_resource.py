from django.db import models
from .resource import Resource

class CareerResource(models.Model):
  career = models.ForeignKey(
    'Career',
    related_name='career_resources',
    on_delete=models.CASCADE
  )
  resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
  quantity = models.DecimalField(max_digits=8, decimal_places=2, default=0)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):
    # Subtract cost from career cash
    if self.quantity > 0:
      career = self.career
      resource = self.resource
      cash_spent = resource.cost * self.quantity
      career.cash = career.cash - cash_spent
      career.save()

    super(CareerResource, self).save(*args, **kwargs)