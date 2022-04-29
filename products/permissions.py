from rest_framework.permissions import SAFE_METHODS, BasePermission
import logging

class PostUserWritePermission(BasePermission):
    message = "Editing post is restricted to authors only"

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        logging.critical(request.user)
        logging.critical(obj.user)        
        return obj.user ==  request.user
        # return True