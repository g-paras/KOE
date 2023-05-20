# from account.serializers import UserSerializer
from rest_framework import serializers

from .models import Product, ProductCategory, ProductBookmark


class ProductSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    bookmarked = serializers.SerializerMethodField(read_only=True)
    profile_img = serializers.ImageField(read_only=True)
    is_owner = serializers.SerializerMethodField()

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
            "is_owner"
        ]
        read_only_fields = ("slug", "owner")

    def get_is_owner(self, obj):
        if self.context['request'].user == obj.owner:
            return True
        return False

    def get_bookmarked(self, obj):
        if self.context['request'].user.is_authenticated:
            return ProductBookmark.objects.filter(product=obj, user=self.context['request'].user).exists()
        return False


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"
