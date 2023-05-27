from rest_framework import permissions as rest_permissions


class ProductCRUDPermission(rest_permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        _has_permission = super().has_object_permission(request, view, obj)

        # owner can not make offer to itself
        # if view.action == 'make_offer' and obj.owner_id == request.user.id:
        #     _has_permission = False

        # check owner permission for PUT, PATCH, and DELETE
        # TODO: simplify the conditions
        if (
            view.action not in ['add_remove_bookmark', 'make_offer'] and
            request.method not in rest_permissions.SAFE_METHODS and
            obj.owner_id != request.user.id
        ):
            _has_permission = False
        
        return _has_permission
