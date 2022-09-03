from datetime import datetime, timedelta, timezone

import jwt
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import smart_bytes, smart_str
from django.utils.http import urlsafe_base64_encode
from jwt.exceptions import DecodeError, ExpiredSignatureError


def send_verification_mail(user):
    token = EmailVerificationTokenGenerator().create_token(user)
    context = {"token": token}
    html_message = render_to_string("email/email-verification.html", context)
    send_mail(
        subject="KietOLX Email Verification",
        message="Please verify your account",
        from_email="KietOLX Support Team",
        recipient_list=[user.email],
        html_message=html_message,
    )


def send_password_reset_mail(user):
    uid = urlsafe_base64_encode(smart_bytes(user.pk))
    token = PasswordResetTokenGenerator().make_token(user)

    password_reset_url = settings.REMOTE_URL + "/change-password/" + uid + "/" + token
    context = {"password_reset_url": password_reset_url}

    html_message = render_to_string("email/request-password-reset.html", context)
    send_mail(
        subject="KietOLX Password Reset",
        message="Reset your password",
        from_email="KietOLX Support Team",
        recipient_list=[user.email],
        html_message=html_message,
    )


def user_verified(user):
    if user.groups.filter(name="NOT_VERIFIED").exists():
        return False
    return True


def check_password(password, re_password):
    if password == "" or re_password == "":
        raise ValidationError({"message": "Password can not be empty"})
    if len(password) < 8:
        raise ValidationError({"message": "Password must be 8 digits long"})
    if password != re_password:
        raise ValidationError({"message": "Password does not match"})


class EmailVerificationTokenGenerator:
    secret = settings.JWT_SALT

    def create_token(self, user, expiry=None):
        payload = {
            "user_id": user.pk,
            "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=5),
        }

        return jwt.encode(payload, self.secret, algorithm="HS256")

    def verify_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
        except DecodeError:
            return False, "Invalid token"
        except ExpiredSignatureError:
            return False, "Token Expired"

        try:
            return True, payload["user_id"]
        except KeyError:
            return False, "Provided token is invalid"
