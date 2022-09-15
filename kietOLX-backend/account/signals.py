from django.contrib.auth.models import Group, User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile
from .utils import EmailVerificationTokenGenerator, send_verification_mail


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # add group: NOT_VERIFIED
        not_verified_group = Group.objects.get(name="NOT_VERIFIED")
        instance.groups.add(not_verified_group)
        # create user profile
        Profile.objects.create(user=instance)
        # send verification mail
        token = EmailVerificationTokenGenerator().create_token(instance)
        send_verification_mail(instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
