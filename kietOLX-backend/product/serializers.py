# from account.serializers import UserSerializer
from rest_framework import serializers

from .models import Product, ProductCategory


class ProductSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="owner.username", read_only=True)
    profile_img = serializers.ImageField(source="owner.profile.image", read_only=True)
    bookmarked = serializers.SerializerMethodField()

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

    def get_bookmarked(self, obj):
        user = self.context["request"].user
        if not user.is_authenticated:
            print("unauthenticated")
            return False
        print("authenticated")
        return obj.bookmarked_by.filter(user=user).exists()


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"
