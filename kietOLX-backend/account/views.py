from django.contrib.auth.models import Group, User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
from .utils import (
    EmailVerificationTokenGenerator,
    check_password,
    send_password_reset_mail,
    send_verification_mail,
    user_verified,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = "username"
    queryset = User.objects.all()
    ordering_fields = ["-created_at"]


class GetUserProfile(APIView):
    """View to retrieve profile data of logged-in user"""

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request, format=None):
        print(request.user)
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)


@api_view(["GET"])
def verify_email(request, token):
    is_valid, user_id = EmailVerificationTokenGenerator().verify_token(token)

    if is_valid:
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response(
                {"message": "No user with provided email exists in our database"},
                status=status.HTTP_404_NOT_FOUND,
            )

        verified_but_not_completed_group = Group.objects.get(
            name="VERIFIED_BUT_INCOMPLETE"
        )

        if user_verified(user):
            return Response(
                {"message": "You account is already verified"},
                status=status.HTTP_200_OK,
            )

        user.groups.clear()
        user.groups.add(verified_but_not_completed_group)

        user.save()

        return Response(
            {"message": "Congratulations your account has been verified"},
            status=status.HTTP_200_OK,
        )

    return Response(
        {"message": "Unable to process your request, provided token is invalid"},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["POST"])
def resend_email_verification(request):
    """functional view to resend verification email

    steps:
    - get email from POST data
    - validate email
    - if valid, get user associated with that email
    - if found, check if user is already verified or not
    - if not, send verification email
    """
    email = request.POST.get("email", "")

    try:
        validate_email(email)
    except ValidationError:
        return Response(
            {"message": "Email is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"message": "No user with this email exists"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if user_verified(user):
        return Response(
            {"message": "Your account is already verified, you can login now"},
            status=status.HTTP_202_ACCEPTED,
        )

    send_verification_mail(user)
    return Response(
        {"message": "Please check your email for verification link"},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def request_password_reset(request):
    """function view to request password reset

    steps:
    - get email from  POST data
    - validate email
    - if valid, fetch user associated with the email
    - if found, send link to reset password
    """
    email = request.POST.get("email", "")

    try:
        validate_email(email)
    except ValidationError:
        return Response(
            {"message": "Enter a valid email address"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"message": "User not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    send_password_reset_mail(user)

    return Response(
        {"message": "Check your mail to reset password"},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def reset_password(request, uid, token):
    try:
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=id)
    except ValueError:
        return Response(
            {"message": "Invalid user id"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except User.DoesNotExist:
        return Response(
            {"message": "User not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if not PasswordResetTokenGenerator().check_token(user, token):
        return Response(
            {"message": "Invalid token provided"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    password = request.POST.get("password", "")
    re_password = request.POST.get("re_password", "")

    try:
        check_password(password, re_password)
    except ValidationError as e:
        return Response(
            e,
            status=status.HTTP_400_BAD_REQUEST,
        )

    user.set_password(password)
    user.save()

    return Response(
        {"message": "Password has been reset successfully"},
        status=status.HTTP_200_OK,
    )
