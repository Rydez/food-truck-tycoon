from django.db import models

class Day(models.Model):
  WEATHER_CONDITIONS = [
    ('sunny', 'sunny'),
    ('cloudy', 'cloudy'),
    ('rainy', 'rainy'),
    ('stormy', 'stormy'),
  ]

  created = models.DateTimeField(auto_now_add=True)
  career = models.ForeignKey('Career', on_delete=models.SET_NULL, null=True)
  headline = models.CharField(max_length=500)
  max_temp = models.SmallIntegerField()
  min_temp = models.SmallIntegerField()
  dawn_condition = models.CharField(max_length=50, choices=WEATHER_CONDITIONS)
  noon_condition = models.CharField(max_length=50, choices=WEATHER_CONDITIONS)
  dusk_condition = models.CharField(max_length=50, choices=WEATHER_CONDITIONS)

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):

    # Generate day
    is_new = self.id is None
    if is_new:

    super(Day, self).save(*args, **kwargs)