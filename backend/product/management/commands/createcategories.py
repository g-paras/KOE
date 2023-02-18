from typing import Any, Optional

from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

from product import models, utils

GROUPS = ["VERIFIED_BUT_INCOMPLETE", "NOT_VERIFIED", "VERIFIED_AND_COMPLETED"]


class Command(BaseCommand):
    """
    django-admin command to create default product categories
    """
    help = 'Create groups for profile verification'

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        for category in utils.CATEGORIES:
            if models.ProductCategory.objects.filter(type__icontains=category).exists():
                continue
            else:
                models.ProductCategory.objects.create(type=category)

