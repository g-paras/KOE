from django.db import models

class GenderMixin(models.Model):
    """
    Gender Model Mixin to be used with people
    """
    MALE = 'M'
    FEMALE = 'F'
    OTHER = '0'

    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other')
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)

    class Meta:
        abstract = True


class TimeStampMixin(models.Model):
    """
    TimeStamp Model Mixin
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeleteManager(models.Manager):
    """
    Object Manager to handle soft delete models
    """
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)
    

class PermanendDeleteManager(models.Manager):
    """
    Object Manager to handle permanent delete models
    """


class SoftDeleteMixin(models.Model):
    """
    Soft Delete Model Mixin for soft-deletable objects
    """
    # TODO: override delete method & implement soft delete, permanent delete
    is_active = models.BooleanField(default=True)

    objects = SoftDeleteManager()
    all_objects = PermanendDeleteManager()

    class Meta:
        abstract = True
