
from rest_framework import permissions, filters

class IsAdminOrCareerOwner(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.user.is_anonymous:
      return False

    if request.method in permissions.SAFE_METHODS:
      return True

    # Ensure the player owns what they're editing
    career_ids = [career.id for career in request.user.careers.all()]
    career_id = None

    if 'career_id' in request.data:
      career_id = request.data['career_id']
    else:
      return True

    if career_id not in career_ids:
      return False

    return True

  def has_object_permission(self, request, view, obj):
    is_admin = bool(request.user and request.user.is_staff)
    is_career_owner = obj.career.player == request.user
    return is_admin or is_career_owner

class IsAdminOrCareerOwnerFilter(filters.BaseFilterBackend):
  def filter_queryset(self, request, queryset, view):
    is_admin = bool(request.user and request.user.is_staff)
    if is_admin:
      return queryset
    else:
      career_ids = [career.id for career in request.user.careers.all()]
      return queryset.filter(career__in=career_ids)

class IsAdminOrReadOnly(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.method in permissions.SAFE_METHODS:
      return True

    return bool(request.user and request.user.is_staff)