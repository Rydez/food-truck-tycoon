from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import (
  Career,
  MenuItem,
  Resource,
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


class MenuItemSerializer(serializers.HyperlinkedModelSerializer):
  menu_item_resources = MenuItemResourceSerializer(many=True)
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

  # def to_representation(self, data):
  #   res = super(MenuItemSerializer, self).to_representation(data)
  #   print(type(res))
  #   return res
  #   # print(data)
  #   # print(res)
  #   # return { item['id']: item for item in res }


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


class CareerSerializer(serializers.HyperlinkedModelSerializer):
  career_menu_items = CareerMenuItemSerializer(many=True, read_only=True)
  class Meta:
    model = Career
    depth = 5
    fields = (
      'url',
      'id',
      'name',
      'created',
      'cash',
      'player',
      'resources',
      'career_menu_items',
      'equipment'
    )


class ResourceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Resource
    fields = ('url', 'id', 'name', 'cost', 'unit', 'created')


class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Equipment
    fields = ('url', 'id', 'name', 'cost', 'created')


class MenuItemEquipmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = MenuItemEquipment
    fields = ('url', 'id', 'menu_item', 'equipment', 'created')


class CareerResourceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = CareerResource
    fields = ('url', 'id', 'career', 'resource', 'quantity', 'created')


class CareerEquipmentSerializer(serializers.HyperlinkedModelSerializer):
  equipment = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all())
  career = serializers.PrimaryKeyRelatedField(queryset=Career.objects.all())
  class Meta:
    model = CareerEquipment
    fields = (
      'url',
      'id',
      'career',
      'equipment',
      'created'
    )
