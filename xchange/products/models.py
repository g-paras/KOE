from datetime import datetime

from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator, FileExtensionValidator
from django.template.defaultfilters import slugify
from django.db import models

from commons import models as common_models
from products import constants as products_constants

class Product(common_models.SoftDeleteMixin, common_models.TimeStampMixin):
    # product status
    ACTIVE = 1
    SOLD = 2
    REPORTED = 3

    STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (SOLD, 'Sold'),
        (REPORTED, 'Reported'),
    ]

    # Product categories
    QUANTUM = "QUANTUM"
    BOOK = "BOOK"
    ACCESSORIES = "ACCESSORIES"
    GADGET = "GADGET"
    ELECTRONICS = "ELECTRONICS"
    OTHERS = "OTHERS"

    CATEGORIES_CHOICES = [
        (QUANTUM, "Quantum"),
        (BOOK, "Book"),
        (ACCESSORIES, "Accessores"),
        (GADGET, "Gadget"),
        (ELECTRONICS, "Electronics"),
        (OTHERS, "Others")
    ]

    title = models.CharField(max_length=products_constants.TITLE_MAX_LEN)
    category = models.CharField(max_length=products_constants.CATEGORY_MAX_LEN, choices=CATEGORIES_CHOICES)
    description = models.CharField(max_length=products_constants.DESCRIPTION_MAX_LEN)
    price = models.PositiveIntegerField(validators=[
        MinValueValidator(products_constants.MIN_PRICE),
        MaxValueValidator(products_constants.MAX_PRICE),
    ])
    status = models.IntegerField(choices=STATUS_CHOICES, default=ACTIVE)
    note = models.CharField(max_length=products_constants.NOTE_MAX_LEN, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products', blank=True)
    # TODO: verification required, shouldn't it be model.DO_NOTHING
    deleted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='deleted_by_me', null=True, blank=True)
    slug = models.SlugField(max_length=products_constants.SLUG_MAX_LEN, null=False, unique=True, blank=True)
    image = models.ImageField(upload_to=products_constants.IMAGE_FOLDER, validators=[FileExtensionValidator(products_constants.ALLOWED_IMAGE_EXTENSIONS)])
    secondary_image = models.ImageField(upload_to=products_constants.IMAGE_FOLDER, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title) + '-' + datetime.now().strftime("%s")
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.title}"


class Bookmark(common_models.TimeStampMixin):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "product"], name="unique_bookmark"),
        ]


class Offer(common_models.TimeStampMixin):
    # offer status
    PENDING = 1
    ACCEPTED = 2
    REJECTED = 3

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
    ]

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, related_name="offers", null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name="my_offers", null=True, blank=True)
    price = models.PositiveSmallIntegerField(validators=[
        MinValueValidator(products_constants.MIN_PRICE),
        MaxValueValidator(products_constants.MAX_PRICE),
    ])
    status = models.IntegerField(choices=STATUS_CHOICES, default=PENDING, blank=True)
    note = models.CharField(blank=True, max_length=products_constants.NOTE_MAX_LEN)
    response = models.CharField(blank=True, max_length=products_constants.NOTE_MAX_LEN)
    edit_count = models.PositiveSmallIntegerField(default=0, blank=True)
