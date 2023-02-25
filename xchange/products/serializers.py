from rest_framework import serializers as rest_serializers

from products import models as products_models
from products import constants as products_constants


class CreateProductSerializer(rest_serializers.ModelSerializer):
    def validate_image(self, value):
        if value.size > products_constants.MAX_FILE_SIZE:
            raise rest_serializers.ValidationError(products_constants.ERROR_MESSAGES['FILE_SIZE_EXCEEDS'])
        return value

    def validate(self, attrs):
        validated_data = super().validate(attrs)
        validated_data['owner'] = self.context['request'].user
        return validated_data

    class Meta:
        model = products_models.Product
        fields = ['title', 'category', 'description', 'price', 'image', 'slug']
        extra_kwargs = {
            "slug": {"read_only": True},
        }
