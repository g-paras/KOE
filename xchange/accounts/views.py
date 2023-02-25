from rest_framework import generics as rest_generics
from rest_framework import permissions as rest_permissions
from rest_framework import views as rest_views
from rest_framework import response as rest_response

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
