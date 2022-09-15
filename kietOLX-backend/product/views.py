from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Product, ProductBookmark, ProductCategory
from .serializers import ProductCategorySerializer, ProductSerializer

User = get_user_model()

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductRetrieveView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated,)


class CategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
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
        (item.product for item in bookmarked_products), many=True
    )
    return Response(serialized.data)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_my_ads(request):
    products = Product.objects.filter(owner=request.user)
    serialized = ProductSerializer(products, many=True)
    return Response(serialized.data)
