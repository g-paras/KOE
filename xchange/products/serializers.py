from rest_framework import serializers as rest_serializers

from products import models as products_models
from products import constants as products_constants
from accounts import models as accounts_models
from commons import utils as commons_utils


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
        fields = ['title', 'category', 'description', 'price', 'image', 'slug', 'status', 'created_at']
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
                  'price', 'image', 'slug', 'created_at', 'owner', 'permissions', 'bookmarked', 'status',]

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
            'can_edit_product': request.user.is_authenticated and request.user.id == instance.owner_id,
            'is_owner': request.user.is_authenticated and request.user.id == instance.owner_id,
            'can_report_and_delete': request.user.is_authenticated and request.user.role_type == accounts_models.CustomUser.ADMIN
        }


class MakeOfferSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = products_models.Offer
        fields = ('price', )


class ProductOfferSerializer(rest_serializers.ModelSerializer):
    user_details = rest_serializers.SerializerMethodField()

    def get_user_details(self, instance):
        return {
            'first_name': instance.user.first_name,
            'last_name': instance.user.last_name,
            'email': instance.user.email,
            'avatar': commons_utils.get_absolute_media_url(self.context['request'], instance.user.avatar.url)
        }

    class Meta:
        model = products_models.Offer
        fields = ('price', 'created_at', 'note', 'status', 'response', 'user_details', 'id')


class AcceptRejectOfferSerializer(rest_serializers.Serializer):
    accept = rest_serializers.BooleanField()


class ProductBookmarkSerializer(rest_serializers.Serializer):
    product = CreateProductSerializer()
    created_at = rest_serializers.DateTimeField()
