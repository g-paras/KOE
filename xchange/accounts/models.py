from django.contrib.auth.models import AbstractUser
from django.db import models

from accounts import constants as accounts_constants
from accounts import utils as accounts_utils
from commons import models as commons_models


class CustomUser(commons_models.TimeStampMixin, commons_models.GenderMixin, AbstractUser):
    # status choices
    CREATED = 1
    VERIFIED = 2
    SUSPENDED = 3
    STATUS_CHOICES = [
        (CREATED, 'Created'),
        (VERIFIED, 'Verified'),
        (SUSPENDED, 'Suspended')
    ]

    # role type choices
    USER = 8000
    ADMIN = 9000
    ROLE_TYPE_CHOICES = [
        (USER, 'User'),
        (ADMIN, 'Admin')
    ]

    # TODO: handle case when active=False, unique check should be skipped (partial index)?
    email = models.EmailField(unique=True)
    avatar = models.ImageField(
        upload_to=accounts_constants.AVATARS_FOLDER, default=accounts_utils.get_default_avatar)
    about_me = models.CharField(
        max_length=accounts_constants.ABOUT_ME_MAX_LEN, blank=True)
    # TODO: superuser should have ADMIN role type (create custom User Manager)
    role_type = models.IntegerField(choices=ROLE_TYPE_CHOICES, default=USER)
    # TODO: superuser status should be verified
    status = models.IntegerField(choices=STATUS_CHOICES, default=CREATED)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
