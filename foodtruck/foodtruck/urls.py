"""foodtruck URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from game.views import (
    PlayerViewSet,
    CareerViewSet,
    MenuItemViewSet,
    ResourceViewSet,
    EquipmentViewSet,
    CareerResourceViewSet,
    CareerMenuItemViewSet,
    CareerEquipmentViewSet,
    MenuItemResourceViewSet,
    MenuItemEquipmentViewSet
)

router = routers.DefaultRouter()
router.register(r'careers', CareerViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'menu_items', MenuItemViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'equipment', EquipmentViewSet)
router.register(r'career_resources', CareerResourceViewSet)
router.register(r'career_menu_items', CareerMenuItemViewSet)
router.register(r'career_equipment', CareerEquipmentViewSet)
router.register(r'menu_item_resources', MenuItemResourceViewSet)
router.register(r'menu_item_equipment', MenuItemEquipmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^', include('game.urls'))
]
