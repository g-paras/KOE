from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from .permissions import PostUserWritePermission

# Create your views here.
class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [PostUserWritePermission, permissions.IsAuthenticatedOrReadOnly]
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
