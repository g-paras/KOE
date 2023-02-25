from rest_framework import viewsets as rest_viewsets
from rest_framework import permissions as rest_permissions

from products import serializers as products_serializers
from products import models as products_models
from products import permissions as products_permissions


class CreateProductAPIView(rest_viewsets.ModelViewSet):
    serializer_class = products_serializers.CreateProductSerializer
    permission_classes = [rest_permissions.IsAuthenticated, products_permissions.ProductCRUDPermission]
    lookup_field = 'slug'

    def get_queryset(self):
        return products_models.Product.objects.filter(status=products_models.Product.ACTIVE)
    
    def destroy(self, request, *args, **kwargs):
        return self.http_method_not_allowed(request, *args, **kwargs)
