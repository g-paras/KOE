from rest_framework import serializers as rest_serializers

from products import models as products_models
from products import constants as products_constants


class CreateProductSerializer(rest_serializers.ModelSerializer):
    def validate_image(self, value):
        if value.size > products_constants.MAX_FILE_SIZE:
            raise rest_serializers.ValidationError(
                products_constants.ERROR_MESSAGES['FILE_SIZE_EXCEEDS'])
        return value

    def validate(self, attrs):
        validated_data = super().validate(attrs)
        validated_data['owner'] = self.context['request'].user
        return validated_data

    class Meta:
        model = products_models.Product
        fields = ['title', 'category', 'description', 'price', 'image', 'slug', 'status']
        extra_kwargs = {
            "slug": {"read_only": True},
        }


class ProductDetailSerializer(rest_serializers.ModelSerializer):
    owner = rest_serializers.SerializerMethodField()
    permissions = rest_serializers.SerializerMethodField()
    bookmarked = rest_serializers.BooleanField()

    class Meta:
        model = products_models.Product
        fields = ['id', 'title', 'category', 'description',
                  'price', 'image', 'slug', 'created_at', 'owner', 'permissions', 'bookmarked', 'status']

    def get_owner(self, instance):
        request = self.context.get('request')
        return {
            'first_name': instance.owner.first_name,
            'last_name': instance.owner.last_name,
            'username': instance.owner.username,
            'avatar': request.build_absolute_uri(instance.owner.avatar.url),
            'email': instance.owner.email,
        }

    def get_permissions(self, instance):
        request = self.context.get('request')
        return {
            'can_edit_product': request.user.is_authenticated and request.user.id == instance.owner_id
        }


class MakeOfferSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = products_models.Offer
        fields = ('price', )
