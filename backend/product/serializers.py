# from account.serializers import UserSerializer
from rest_framework import serializers

from .models import Product, ProductCategory


class ProductSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    bookmarked = serializers.BooleanField(read_only=True)
    profile_img = serializers.ImageField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "image",
            "price",
            "title",
            "category",
            "description",
            "updated_at",
            "created_at",
            "owner",
            "username",
            "profile_img",
            "slug",
            "bookmarked",
        ]
        read_only_fields = ("slug", "owner")



class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"
