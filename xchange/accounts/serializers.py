from django.contrib.auth import authenticate
from django.contrib.auth import password_validation as validators
from django.core import exceptions
from django.shortcuts import get_object_or_404
from rest_framework import exceptions as rest_exceptions
from rest_framework import serializers as rest_serializers
from rest_framework.authtoken import models as auth_models

from accounts import constants as accounts_constants
from accounts import models as accounts_models
from accounts import utils as accounts_utils
from commons import tasks as commons_tasks


class BaseUserSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = accounts_models.CustomUser
        fields = ['username', 'email', 'avatar', 'first_name', 'last_name', 'about_me']


class SetPasswordSerializer(rest_serializers.Serializer):
    password = rest_serializers.CharField(
        min_length=accounts_constants.PASSWORD_MIN_LEN,
        max_length=accounts_constants.PASSWORD_MAX_LEN,
        trim_whitespace=False
    )
    confirm_password = rest_serializers.CharField(
        min_length=accounts_constants.PASSWORD_MIN_LEN,
        max_length=accounts_constants.PASSWORD_MAX_LEN,
        trim_whitespace=False
    )

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as e:
            raise rest_serializers.ValidationError(list(e.messages))

        return value
    
    def validate(self, attrs):
        validated_data = super().validate(attrs)
        if validated_data['password'] != validated_data['confirm_password']:
            raise rest_serializers.ValidationError("Passwords don't match")
        return validated_data


class UserRegistrationSerializer(rest_serializers.ModelSerializer):
    confirm_password = rest_serializers.CharField(
        min_length=accounts_constants.PASSWORD_MIN_LEN,
        max_length=accounts_constants.PASSWORD_MAX_LEN,
        trim_whitespace=False,
        write_only=True
    )

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as e:
            raise rest_serializers.ValidationError(list(e.messages))
        return value

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        errors = {}

        if validated_data['password'] != validated_data['confirm_password']:
            errors['confirm_password'] = ["Password does not match"]

        if validated_data['username'] + '@kiet.edu' != validated_data['email']:
            errors['email'] = ['Please Enter valid email address']

        if errors:
            raise rest_serializers.ValidationError(errors)
        
        validated_data.pop('confirm_password')
        return validated_data
    
    def create(self, validated_data):
        user =  accounts_models.CustomUser.objects.create_user(**validated_data)
        commons_tasks.send_verification_email(user=user)
        return user

    class Meta:
        model = accounts_models.CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        extra_kwargs = {
            "password": {"write_only": True, "trim_whitespace": False},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }


class UserLoginSerializer(rest_serializers.Serializer):
    username = rest_serializers.CharField(write_only=True, trim_whitespace=False)
    password = rest_serializers.CharField(write_only=True, trim_whitespace=False)
    auth_token = rest_serializers.SerializerMethodField()

    def validate(self, attrs):
        validated_data = super().validate(attrs)
        user = authenticate(username=validated_data['username'], password=validated_data['password'])

        if not user or not user.is_active:
            raise rest_exceptions.AuthenticationFailed(accounts_constants.ERROR_MESSAGES['INACTIVE_ACCOUNT'])

        if user.status == accounts_models.CustomUser.CREATED:
            raise rest_exceptions.AuthenticationFailed(accounts_constants.ERROR_MESSAGES['VERIFICATION_REQUIRED'])
        elif user.status == accounts_models.CustomUser.SUSPENDED:
            raise rest_exceptions.AuthenticationFailed(accounts_constants.ERROR_MESSAGES['ACCOUNT_SUSPENDED'])
        else:
            self._user = user

        return validated_data

    def get_auth_token(self, obj):
        token, _ = auth_models.Token.objects.get_or_create(user=self._user)
        return token.key


class EmailVerificationSerializer(rest_serializers.Serializer):
    token = rest_serializers.CharField(write_only=True)
    auth_token = rest_serializers.SerializerMethodField()

    def validate(self, attrs):
        valdiated_data = super().validate(attrs)
        self.payload = accounts_utils.EmailVerificationTokenGenerator.verify_token(valdiated_data['token'])

        user = get_object_or_404(accounts_models.CustomUser, id=self.payload.get('user_id'))

        if not user.is_active:
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['INACTIVE_ACCOUNT'])
        elif user.status != self.payload.get('user_status'):
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['INVALID_TOKEN'])
        elif user.status == accounts_models.CustomUser.SUSPENDED:
            raise rest_serializers.ValidationError(accounts_constants.ERROR_MESSAGES['ACCOUNT_SUSPENDED'])

        user.status = accounts_models.CustomUser.VERIFIED
        user.save()
        self._user = user

        return valdiated_data

    def get_auth_token(self, obj):
        token, _ = auth_models.Token.objects.get_or_create(user=self._user)
        return token.key


class ResendEmailVerification(rest_serializers.Serializer):
    username = rest_serializers.CharField()

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        user = get_object_or_404(accounts_models.CustomUser, username=validated_data['username'])
        if not user.is_active:
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['ACCOUNT_NOT_FOUND'])
        elif user.status == accounts_models.CustomUser.VERIFIED:
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['ALREADY_VERIFIED'])
        elif user.status == accounts_models.CustomUser.SUSPENDED:
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['ACCOUNT_SUSPENDED'])

        commons_tasks.send_verification_email(user=user)
        return validated_data


class RequestForgotPasswordSerializer(rest_serializers.Serializer):
    username = rest_serializers.CharField()

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        user = accounts_models.CustomUser.objects.filter(username=validated_data['username']).first()

        if not (user and user.is_active):
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['ACCOUNT_NOT_FOUND'])
        elif user.status == accounts_models.CustomUser.SUSPENDED:
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['ACCOUNT_SUSPENDED'])

        commons_tasks.send_forgot_password_email(user=user)
        return validated_data


class ForgotPasswordSerializer(rest_serializers.Serializer):
    password = rest_serializers.CharField(
        min_length=accounts_constants.PASSWORD_MIN_LEN,
        max_length=accounts_constants.PASSWORD_MAX_LEN,
        trim_whitespace=False
    )
    confirm_password = rest_serializers.CharField(
        min_length=accounts_constants.PASSWORD_MIN_LEN,
        max_length=accounts_constants.PASSWORD_MAX_LEN,
        trim_whitespace=False
    )
    token = rest_serializers.CharField()

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as e:
            raise rest_serializers.ValidationError(list(e.messages))

        return value
    
    def validate_token(self, value):
        payload = accounts_utils.ResetPasswordTokenGenerator.verify_token(value)
        self.user = get_object_or_404(accounts_models.CustomUser, id=payload.get('id'))

        if (
            self.user.status != payload.get('status') or
            self.user.password != payload.get('password')
        ):
            raise rest_serializers.ValidationError(accounts_constants.ERROR_MESSAGES['INVALID_LINK'])

        return value
    
    def validate(self, attrs):
        validated_data = super().validate(attrs)
        if validated_data['password'] != validated_data['confirm_password']:
            raise rest_serializers.ValidationError("Passwords don't match")
        return validated_data

    def update_password(self):
        self.user.set_password(self.validated_data['password'])
        self.user.save(update_fields=['password'])


class EditProfileSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = accounts_models.CustomUser
        fields = ('first_name', 'last_name', 'about_me')
