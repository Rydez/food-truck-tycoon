from random import randint

from django.db import models

from ..lib.simulator import simulate_day

class Day(models.Model):
  WEATHER_CONDITIONS = [
    ('sunny', 'sunny'),
    ('cloudy', 'cloudy'),
    ('rainy', 'rainy'),
    ('stormy', 'stormy'),
  ]

  created = models.DateTimeField(auto_now_add=True)
  career = models.ForeignKey(
    'Career',
    related_name='days',
    on_delete=models.SET_NULL,
    null=True
  )
  max_temp = models.SmallIntegerField(blank=True)
  min_temp = models.SmallIntegerField(blank=True)
  dawn_condition = models.CharField(
    max_length=50,
    choices=WEATHER_CONDITIONS,
    blank=True
  )
  noon_condition = models.CharField(
    max_length=50,
    choices=WEATHER_CONDITIONS,
    blank=True
  )
  dusk_condition = models.CharField(
    max_length=50,
    choices=WEATHER_CONDITIONS,
    blank=True
  )

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):

    # Generate day
    is_new = self.id is None
    if is_new:
      number_of_conditions = len(self.WEATHER_CONDITIONS) - 1
      self.dawn_condition = self.WEATHER_CONDITIONS[randint(0, number_of_conditions)][0]
      self.noon_condition = self.WEATHER_CONDITIONS[randint(0, number_of_conditions)][0]
      self.dusk_condition = self.WEATHER_CONDITIONS[randint(0, number_of_conditions)][0]
      self.min_temp = randint(30, 90)
      self.max_temp = randint(self.min_temp, 100)

    if len(self.career.days.all()) != 0:
      simulate_day(self.career)

    super(Day, self).save(*args, **kwargs)