from django.db.models import Exists, OuterRef, Q, Value
from django.shortcuts import get_object_or_404
from rest_framework import decorators as rest_decorators
from rest_framework import exceptions as rest_exceptions
from rest_framework import permissions as rest_permissions
from rest_framework import response as rest_response
from rest_framework import status as rest_status
from rest_framework import views as rest_views
from rest_framework import viewsets as rest_viewsets

from commons import tasks as common_tasks
from products import models as products_models
from products import permissions as products_permissions
from products import serializers as products_serializers


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
        elif self.action == 'get_offers':
            serializer_class = products_serializers.ProductOfferSerializer
        elif self.action == 'get_bookmarks':
            serializer_class = products_serializers.ProductBookmarkSerializer
        return serializer_class

    def get_queryset(self):
        queryset = products_models.Product.objects.filter(status=products_models.Product.ACTIVE)
        if self.action == 'retrieve':
            queryset = queryset.prefetch_related('owner').annotate(
                bookmarked=(Exists(products_models.Bookmark.objects.filter(
                    product_id=OuterRef('pk'), user_id=self.request.user.id
                )) if self.request.user.is_authenticated else Value(False))
            )
        # filtering based on title, if present
        title = self.request.query_params.get('title')
        if self.action == 'list' and title:
            queryset = queryset.filter(title__icontains=title)
        return queryset

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        product.is_active = False
        product.save(update_fields=['is_active'])
        return rest_response.Response(status=rest_status.HTTP_204_NO_CONTENT)

    @rest_decorators.action(detail=True, methods=['POST'], url_path='add-remove-bookmark', url_name='add-remove-bookmark')
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
            raise rest_exceptions.ValidationError('You have already made an offer')
        common_tasks.send_offer_made_email(user=request.user, product=product)
        return rest_response.Response({'details': 'Yay! you have made an offer'})

    @rest_decorators.action(detail=True, methods=['POST'], url_path='mark-sold', url_name='mark-sold')
    def mark_sold(self, request, slug=None):
        product = self.get_object()
        product.status = products_models.Product.SOLD
        product.save(update_fields=['status'])
        return rest_response.Response({'details': 'Product marked as sold successfully'})

    @rest_decorators.action(
        detail=True, methods=['GET'], url_path='offers', url_name='get-offers',
        permission_classes=[rest_permissions.IsAuthenticated]
    )
    def get_offers(self, request, slug=None):
        product = self.get_object()
        offers_queryset = products_models.Offer.objects.filter(product_id=product.id).prefetch_related('user')

        if product.owner_id != request.user.id:
            offers_queryset = offers_queryset.filter(user_id=request.user.id)

        # if user is the owner of product or if there is any offer made by the user in PENDING, ACCEPTED
        # status then user can not make offer
        can_make_offer = not (
            product.owner_id == request.user.id or
            products_models.Offer.objects.filter(
                ~Q(status=products_models.Offer.REJECTED), product_id=product.id, user_id=request.user.id
            ).exists()
        )

        return rest_response.Response({
            'data': self.get_serializer(offers_queryset.order_by('-created_at'), many=True).data,
            'can_make_offer': can_make_offer
        })
    
    @rest_decorators.action(
        detail=False, methods=['GET'], url_path='my-ads', url_name='my-ads',
        permission_classes=[rest_permissions.IsAuthenticated]
    )
    def my_ads(self, request):
        qs = products_models.Product.objects.filter(owner_id=request.user.id)
        return rest_response.Response(self.get_serializer(qs, many=True).data)

    @rest_decorators.action(
        detail=False, methods=['GET'], url_path='bookmarks', url_name='bookmarks',
        permission_classes=[rest_permissions.IsAuthenticated]
    )
    def get_bookmarks(self, request):
        qs = products_models.Bookmark.objects.filter(user_id=request.user.id).prefetch_related('product').order_by('-created_at')
        return rest_response.Response(self.get_serializer(qs, many=True).data)


class AcceptRejectOfferAPIView(rest_views.APIView):
    serializer_class = products_serializers.AcceptRejectOfferSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(products_models.Product, slug=self.kwargs['slug'])
        if product.status != products_models.Product.ACTIVE:
            raise rest_exceptions.ValidationError('No active product found!')

        offer = get_object_or_404(products_models.Offer, product_id=product.id, id=self.kwargs['offer_id'])
        if offer.status == offer.ACCEPTED and serializer.validated_data['accept']:
            raise rest_exceptions.ValidationError('Offer already accepted')

        if offer.status == offer.REJECTED and not serializer.validated_data['accept']:
            raise rest_exceptions.ValidationError('Offer already rejected')

        offer.status = offer.ACCEPTED if serializer.validated_data['accept'] else offer.REJECTED
        offer.save(update_fields=['status'])

        common_tasks.send_offer_accept_reject_email(
            offer.user, product=product, accepted=serializer._validated_data['accept']
        )

        return rest_response.Response({})
