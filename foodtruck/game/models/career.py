from django.db import models
from django.contrib.auth import get_user_model
from .resource import Resource
from .menu_item import MenuItem
from .equipment import Equipment
from .location import Location
from .truck import Truck
from .career_resource import CareerResource

Player = get_user_model()

class Career(models.Model):
  name = models.CharField(max_length=100, blank=True, default='')
  created = models.DateTimeField(auto_now_add=True)
  player = models.ForeignKey(Player, related_name='careers', on_delete=models.CASCADE)
  location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, default=1)
  truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, null=True, default=1)
  cash = models.DecimalField(max_digits=8, decimal_places=2, default=2000)
  resources = models.ManyToManyField(Resource, through='CareerResource')
  menu_items = models.ManyToManyField(MenuItem, through='CareerMenuItem')
  equipment = models.ManyToManyField(Equipment, through='CareerEquipment')

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):
    is_new = self.id is None


    if not is_new:
      original = Career.objects.get(id=self.id)
      if self.truck and original.truck != self.truck:
        truck = Truck.objects.get(id=self.truck)
        pass

      if self.location and original.location != self.location:
        location = Location.objects.get(id=self.location)
        pass


    # Call super first, so the id exists
    super(Career, self).save(*args, **kwargs)

    # Initialize career resources with zero quantities
    if is_new:
      resources = Resource.objects.all()
      for resource in resources:
        CareerResource.objects.create(career_id=self.id, resource_id=resource.id)
