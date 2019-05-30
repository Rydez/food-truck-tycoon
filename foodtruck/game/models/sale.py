from django.db import models

from .day import Day
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
    ('tastful', 'tastful'),
    ('distastful', 'distastful'),
    ('fast', 'fast'),
    ('slow', 'slow'),
  ]

  price = models.DecimalField(max_digits=8, decimal_places=2)
  menu_item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True)
  day = models.ForeignKey(Day, on_delete=models.SET_NULL, null=True)
  created = models.DateTimeField(auto_now_add=True)
  result = models.CharField(max_length=50, choices=RESULTS)
  review = models.CharField(max_length=50, choices=REVIEWS, null=True)

  # -1 to 1
  review_polarity = models.DecimalField(max_digits=3, decimal_places=2)

  class Meta:
    ordering = ('created',)
