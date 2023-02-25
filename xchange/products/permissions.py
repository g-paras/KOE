from rest_framework import permissions as rest_permissions


class ProductCRUDPermission(rest_permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        _has_permission = super().has_object_permission(request, view, obj)

        if request.method not in rest_permissions.SAFE_METHODS and obj.owner_id != request.user.id:
            _has_permission = False
        
        return _has_permission
