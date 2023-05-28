from rest_framework import generics as rest_generics
from rest_framework import permissions as rest_permissions
from rest_framework import views as rest_views
from rest_framework import response as rest_response
from rest_framework import status as rest_status

from accounts import serializers as accounts_serializers


class UserRegistrationView(rest_generics.CreateAPIView):
    permission_classes = [rest_permissions.AllowAny, ]
    serializer_class = accounts_serializers.UserRegistrationSerializer


class UserLoginAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.UserLoginSerializer
    permission_classes = [rest_permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return rest_response.Response(serializer.data)


class EmailVerificationAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.EmailVerificationSerializer
    permission_classes = [rest_permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return rest_response.Response(serializer.data)


class BaseAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.BaseUserSerializer

    def get(self, request, *args, **kwargs):
        data = self.serializer_class(request.user).data
        data['avatar'] = request.build_absolute_uri(data['avatar'])
        return rest_response.Response(data)


class ResendVerificationEmailAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.ResendEmailVerification
    permission_classes = [rest_permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return rest_response.Response()


class SetPasswordAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.SetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        user.set_password(serializer.validated_data['password'])
        user.save(update_fields=['password'])
        return rest_response.Response(status=rest_status.HTTP_204_NO_CONTENT)


class RequestForgotPasswordAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.RequestForgotPasswordSerializer
    permission_classes = [rest_permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return rest_response.Response()


class ForgotPasswordAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.ForgotPasswordSerializer
    permission_classes = [rest_permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update_password()
        return rest_response.Response()

class EditProfileAPIView(rest_views.APIView):
    serializer_class = accounts_serializers.EditProfileSerializer

    def post(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.serializer_class(instance=instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return rest_response.Response()
