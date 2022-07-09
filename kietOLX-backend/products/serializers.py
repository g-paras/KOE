# from itertools import product
# from unicodedata import category
# from wsgiref import validate
from rest_framework import serializers
from .models import Product, Category
from rest_framework.fields import CurrentUserDefault

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'user', 'price']

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'url']