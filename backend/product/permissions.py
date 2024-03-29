from rest_framework.permissions import SAFE_METHODS, BasePermission


class PostUserWritePermission(BasePermission):
    message = "Editing post is restricted to authors only"

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True     
        return obj.owner ==  request.user
