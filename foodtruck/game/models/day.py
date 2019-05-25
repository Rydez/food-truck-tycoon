from django.db import models

from .career import Career
# - days
#   + headline
#   + good_location_id
#   + bad_location_id
#   + max_temp
#   + min_temp
#   + dawn_condition (sunny, cloudy, rainy, stormy)
#   + noon_condition (sunny, cloudy, rainy, stormy)
#   + dusk_condition (sunny, cloudy, rainy, stormy)

class Day(models.Model):
  WEATHER_CONDITIONS = [
    ('sunny', 'sunny'),
    ('cloudy', 'cloudy'),
    ('rainy', 'rainy'),
    ('stormy', 'stormy'),
  ]

  created = models.DateTimeField(auto_now_add=True)
  career = models.ForeignKey(Career, on_delete=models.SET_NULL, null=True)
  headline = models.CharField(max_length=500)
  max_temp = models.SmallIntegerField()
  min_temp = models.SmallIntegerField()
  dawn_condition = models.CharField(max_length=50)
  noon_condition = models.CharField(max_length=50)
  dusk_condition = models.CharField(max_length=50)
  location_popularity
  location_satisfaction
  menu_item_popularity
  menu_item_satisfaction




  name = models.CharField(max_length=100, blank=True, default='')
  player = models.ForeignKey(Player, related_name='careers', on_delete=models.CASCADE)
  truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, null=True, blank=True, default=1)
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
