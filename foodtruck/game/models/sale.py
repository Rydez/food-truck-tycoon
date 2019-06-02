from django.db import models

from .menu_item import MenuItem


class Sale(models.Model):
  RESULTS = [
    ('passed', 'passed'),
    ('rejected', 'rejected'),
    ('purchased', 'purchased'),
  ]

  REVIEWS = [
    ('cheap', 'cheap'),
    ('expensive', 'expensive'),
    ('tasteful', 'tasteful'),
    ('distasteful', 'distasteful'),
    ('fast', 'fast'),
    ('slow', 'slow'),
  ]

  price = models.DecimalField(max_digits=8, decimal_places=2)
  menu_item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True)
  day = models.ForeignKey('Day', on_delete=models.SET_NULL, null=True)
  result = models.CharField(max_length=50, choices=RESULTS)
  review = models.CharField(max_length=50, choices=REVIEWS, null=True)
  minute_of_day = models.PositiveSmallIntegerField()
  rating = models.DecimalField(max_digits=3, decimal_places=2)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)
