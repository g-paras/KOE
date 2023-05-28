import random

from django.conf import settings
from django.utils import timezone
import jwt
from jwt import exceptions as jwt_exceptions
from rest_framework import exceptions as rest_exceptions

from accounts import constants as accounts_constants


def get_default_avatar():
    """
    Method to return a random avatar from the default avatars list
    """
    return random.choice(accounts_constants.DEFAULT_AVATARS)

class EmailVerificationTokenGenerator:
    SECRET = settings.SECRET_KEY

    @classmethod
    def create_token(cls, user):
        """
        Method to create jwt token for email verification
        """
        payload = {
            "user_id": user.id,
            "user_status": user.status,
            "exp": timezone.now() + settings.EMAIL_VERIFICATON_TIMEOUT
        }
        return jwt.encode(payload, cls.SECRET, algorithm="HS256")
    
    @classmethod
    def verify_token(cls, token):
        """
        Method to verify the email verification token
        """
        try:
            payload = jwt.decode(token, cls.SECRET, algorithms=["HS256"])
        except (jwt_exceptions.DecodeError, jwt_exceptions.ExpiredSignatureError):
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['INVALID_TOKEN'])
        return payload


class ResetPasswordTokenGenerator:
    SECRET = settings.SECRET_KEY

    @classmethod
    def create_token(cls, user):
        """
        we are considering 3 fields as of now for verifying user
        if any of those changes then token will be considered as invalid
        """
        payload = {
            "id": user.id,
            "password": user.password,
            "status": user.status,
            "last_login": user.last_login.replace(microsecond=0, tzinfo=None),
            "exp": timezone.now() + settings.FORGOT_PASSWORD_TIMEOUT
        }
        return jwt.encode(payload, cls.SECRET, algorithm="HS256")

    @classmethod
    def verify_token(cls, token):
        try:
            payload = jwt.decode(token, cls.SECRET, algorithms=["HS256"])
        except (jwt_exceptions.DecodeError, jwt_exceptions.ExpiredSignatureError):
            raise rest_exceptions.ValidationError(accounts_constants.ERROR_MESSAGES['INVALID_TOKEN'])
        return payload


def get_verification_url(token):
    return ""

def send_verification_email(user):
    print("############### Mail sent #################", EmailVerificationTokenGenerator.create_token(user))

def send_forgot_password_email(user):
    print("############### Mail sent #################", ResetPasswordTokenGenerator.create_token(user))
