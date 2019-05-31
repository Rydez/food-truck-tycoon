from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import (
  Day,
  Truck,
  Career,
  Location,
  MenuItem,
  Resource,
  Headline,
  Equipment,
  CareerResource,
  CareerMenuItem,
  CareerEquipment,
  MenuItemResource,
  MenuItemEquipment
)


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = get_user_model()
    fields = ('url', 'username', 'email', 'groups', 'careers')


class LocationSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Location
    fields = (
      'url',
      'id',
      'name',
      'cost',
      'popularity',
      'sentiment',
      'keywords',
      'truck_position'
    )


class HeadlineSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Headline
    fields = (
      'url',
      'id',
      'title',
      'polarity',
      'menu_item',
      'location',
      'created'
    )


class TruckSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Truck
    fields = ('url', 'id', 'name', 'cost', 'capacity')


class MenuItemResourceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = MenuItemResource
    depth = 5
    fields = (
      'url',
      'id',
      'resource',
      'quantity',
      'created'
    )


class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Equipment
    fields = ('url', 'id', 'name', 'cost', 'weight', 'created')


class MenuItemSerializer(serializers.HyperlinkedModelSerializer):
  menu_item_resources = MenuItemResourceSerializer(many=True)
  equipment = EquipmentSerializer(many=True, read_only=True)
  class Meta:
    model = MenuItem
    depth = 5
    fields = (
      'url',
      'id',
      'name',
      'menu_item_resources',
      'equipment',
      'created'
    )


class ResourceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Resource
    fields = ('url', 'id', 'name', 'cost', 'unit', 'created')


class CareerMenuItemSerializer(serializers.HyperlinkedModelSerializer):
  menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())
  career = serializers.PrimaryKeyRelatedField(queryset=Career.objects.all())
  class Meta:
    model = CareerMenuItem
    depth = 5
    fields = (
      'url',
      'id',
      'menu_item',
      'career',
      'created'
    )


class CareerEquipmentSerializer(serializers.HyperlinkedModelSerializer):
  equipment = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all())
  career = serializers.PrimaryKeyRelatedField(queryset=Career.objects.all())
  class Meta:
    model = CareerEquipment
    depth = 5
    fields = (
      'url',
      'id',
      'career',
      'equipment',
      'created'
    )


class CareerResourceSerializer(serializers.HyperlinkedModelSerializer):
  resource = serializers.PrimaryKeyRelatedField(queryset=Resource.objects.all())
  career = serializers.PrimaryKeyRelatedField(queryset=Career.objects.all())
  class Meta:
    model = CareerResource
    depth = 5
    fields = (
      'url',
      'id',
      'career',
      'resource',
      'quantity',
      'created'
    )


class DaySerializer(serializers.HyperlinkedModelSerializer):
  career = serializers.PrimaryKeyRelatedField(queryset=Career.objects.all())
  class Meta:
    model = Day
    depth = 5
    fields = (
      'url',
      'id',
      'career',
      'created',
      'max_temp',
      'min_temp',
      'dawn_condition',
      'noon_condition',
      'dusk_condition'
    )


class CareerSerializer(serializers.HyperlinkedModelSerializer):
  career_resources = CareerResourceSerializer(many=True, read_only=True)
  career_menu_items = CareerMenuItemSerializer(many=True, read_only=True)
  career_equipment = CareerEquipmentSerializer(many=True, read_only=True)
  days = DaySerializer(many=True, read_only=True)
  truck = serializers.PrimaryKeyRelatedField(queryset=Truck.objects.all(), required=False)
  location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), required=False)
  class Meta:
    model = Career
    depth = 5
    fields = (
      'url',
      'days',
      'id',
      'name',
      'created',
      'cash',
      'player',
      'truck',
      'location',
      'career_resources',
      'career_menu_items',
      'career_equipment'
    )


class MenuItemEquipmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = MenuItemEquipment
    fields = ('url', 'id', 'menu_item', 'equipment', 'created')
