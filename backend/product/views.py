from django.db.models import F, Exists, OuterRef, Value
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Offer, Product, ProductBookmark, ProductCategory
from .serializers import ProductCategorySerializer, ProductSerializer
from .utils import send_offer_mail
from .permissions import PostUserWritePermission

User = get_user_model()


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.annotate(
            username=F('owner__username')
        ).order_by('-created_at').filter(active=True, sold=False)
        return qs


class ProductRetrieveView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = Product.objects.annotate(username=F(
            'owner__username'), profil_img=F('owner__profile__image'))
        if self.request.user.is_authenticated:
            qs = qs.annotate(
                bookmarked=Exists(ProductBookmark.objects.filter(
                    user=self.request.user, product=OuterRef('pk')))
            )
        else:
            qs = qs.annotate(
                bookmarked=Value(False)
            )

        return qs


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        serializer = self.get_serializer(data=request.data, context=context)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated, PostUserWritePermission)
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'


class CategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects
    serializer_class = ProductCategorySerializer


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def add_remove_bookmark(request):
    product_id = request.POST.get("product", None)

    product = get_object_or_404(Product, pk=product_id)

    query = ProductBookmark.objects.filter(user=request.user, product=product)

    if query.exists():
        query.first().delete()  # type: ignore
        return Response({"value": False})
    else:
        ProductBookmark.objects.create(user=request.user, product=product)
        return Response({"value": True})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_bookmarks(request):
    bookmarked_products = ProductBookmark.objects.filter(user=request.user)
    serialized = ProductSerializer(
        (item.product for item in bookmarked_products), many=True, context={'request': request}
    )
    return Response(serialized.data)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_my_ads(request):
    products = Product.objects.filter(owner=request.user)
    serialized = ProductSerializer(
        products, many=True, context={'request': request})
    return Response(serialized.data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def make_offer(request):
    product_id = request.POST.get("product_id", None)
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response(
            {"message": "Product does not exist", "status": "error"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if Offer.objects.filter(product=product, user=request.user).exists():
        return Response(
            {"message": "You have already made a offer", "status": "success"}
        )

    Offer.objects.create(product=product, user=request.user)
    send_offer_mail(request.user, product)

    return Response(
        {
            "message": "Offer made successfully, Owner will contact you via email",
            "status": "success",
        }
    )


@api_view(["GET"])
def search_product(request, query):
    queryset = Product.objects.filter(title__icontains=query, active=True, sold=False)
    products = ProductSerializer(
        queryset, many=True,  context={'request': request})
    return Response(products.data)
