from typing import Any, Optional

from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

GROUPS = ["VERIFIED_BUT_INCOMPLETE", "NOT_VERIFIED", "VERIFIED_AND_COMPLETED"]


class Command(BaseCommand):
    """
    django-admin command to create groups for verification
    """
    help = 'Create groups for profile verification'

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        for group in GROUPS:
            Group.objects.create(name=group)

        self.stdout.write("Group objects created successfully")
