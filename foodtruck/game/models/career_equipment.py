from django.db import models
from .career import Career
from .equipment import Equipment

class CareerEquipment(models.Model):
  career = models.ForeignKey(
    Career,
    related_name='career_equipment',
    on_delete=models.CASCADE
  )
  equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created',)

  def save(self, *args, **kwargs):

    # Subtract cost from career cash
    print(self.career)
    print(self.equipment)

    career = Career.objects.get(id=self.career)
    equipment = Equipment.objects.get(id=self.equipment)
    career.cash = career.cash - equipment.cost
    career.save()

    super(CareerEquipment, self).save(*args, **kwargs)