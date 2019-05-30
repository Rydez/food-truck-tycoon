from django.db import models
from django.contrib.auth import get_user_model
from .resource import Resource
from .menu_item import MenuItem
from .equipment import Equipment
from .location import Location
from .truck import Truck
from .career_resource import CareerResource
from .day import Day

Player = get_user_model()

class Career(models.Model):
  name = models.CharField(max_length=100, blank=True, default='')
  created = models.DateTimeField(auto_now_add=True)
  player = models.ForeignKey(Player, related_name='careers', on_delete=models.CASCADE)
  location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True, default=1)
  truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, null=True, blank=True, default=1)
  cash = models.DecimalField(max_digits=8, decimal_places=2, default=2000)
  resources = models.ManyToManyField(Resource, through='CareerResource')
  menu_items = models.ManyToManyField(MenuItem, through='CareerMenuItem')
  equipment = models.ManyToManyField(Equipment, through='CareerEquipment')
  rating = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):
    is_new = self.id is None

    # Subtract cost of location or truck
    if not is_new:
      original = Career.objects.get(id=self.id)
      if self.truck and original.truck.id != self.truck.id:
        self.cash = self.cash or original.cash
        cost = self.truck.cost - original.truck.cost
        self.cash = self.cash - cost

      if self.location and original.location.id != self.location.id:
        location = Location.objects.get(id=self.location.id)
        self.cash = self.cash or original.cash
        self.cash = self.cash - location.cost

    # Call super first, so the id exists
    super(Career, self).save(*args, **kwargs)

    # Initialize career
    if is_new:

      # Resources with zero quantities
      resources = Resource.objects.all()
      for resource in resources:
        CareerResource.objects.create(career_id=self.id, resource_id=resource.id)

      # First day
      Day.objects.create(career_id=self.id)
