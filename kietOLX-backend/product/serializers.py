# from account.serializers import UserSerializer
from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="owner.username", read_only=True)
    profile_img = serializers.ImageField(source="owner.profile.image", read_only=True)

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
        ]
        read_only_fields = ("slug", "owner")
