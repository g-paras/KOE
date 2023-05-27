from django.db.models import Exists, OuterRef, Value
from rest_framework import viewsets as rest_viewsets
from rest_framework import permissions as rest_permissions
from rest_framework import exceptions as rest_exceptions
from rest_framework import decorators as rest_decorators
from rest_framework import response as rest_response
from rest_framework import status as rest_status

from products import serializers as products_serializers
from products import models as products_models
from products import permissions as products_permissions


class CreateProductAPIView(rest_viewsets.ModelViewSet):
    serializer_class = products_serializers.CreateProductSerializer
    permission_classes = (rest_permissions.IsAuthenticatedOrReadOnly,
                          products_permissions.ProductCRUDPermission)
    lookup_field = 'slug'

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.action == 'retrieve':
            serializer_class = products_serializers.ProductDetailSerializer
        elif self.action == 'make_offer':
            serializer_class = products_serializers.MakeOfferSerializer
        return serializer_class

    def get_queryset(self):
        import time
        time.sleep(2)
        queryset = products_models.Product.objects.filter(
            status=products_models.Product.ACTIVE)
        if self.action == 'retrieve':
            queryset = queryset.prefetch_related('owner').annotate(
                bookmarked=(Exists(products_models.Bookmark.objects.filter(
                    product_id=OuterRef('pk'), user_id=self.request.user.id
                )) if self.request.user.is_authenticated else Value(False))
            )
        return queryset

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        product.is_active = False
        product.save(update_fields=['is_active'])
        return rest_response.Response(status=rest_status.HTTP_204_NO_CONTENT)

    @rest_decorators.action(detail=True, methods=['post'], url_path='add-remove-bookmark', url_name='add-remove-bookmark')
    def add_remove_bookmark(self, request, slug=None):
        """
        API view to add product bookmark
        """
        product = self.get_object()
        object, created = products_models.Bookmark.objects.get_or_create(
            user_id=request.user.id, product_id=product.id)
        if not created:
            object.delete()
        return rest_response.Response()

    @rest_decorators.action(detail=True, methods=['POST'], url_path='make-offer', url_name='make-offer')
    def make_offer(self, request, slug=None):
        """
        API view to make offer for a product
        """
        product = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        offer, created = products_models.Offer.objects.get_or_create(
            product_id=product.id, user_id=request.user.id, status=products_models.Offer.PENDING,
            defaults={'price': serializer.validated_data['price']}
        )
        if not created:
            raise rest_exceptions.ValidationError(
                'You have already made an offer')
        # TODO: send mail on creation
        return rest_response.Response({'details': 'Yay! you have made an offer'})

    @rest_decorators.action(detail=True, methods=['POST'], url_path='mark-sold', url_name='mark-sold')
    def mark_sold(self, request, slug=None):
        product = self.get_object()
        product.status = products_models.Product.SOLD
        product.save(update_fields=['status'])
        return rest_response.Response({'details': 'Product marked as sold successfully'})

# edit
# my ads
# my bookmarks
