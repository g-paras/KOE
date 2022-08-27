from django.contrib.auth.models import User
from django.db import models
from django.utils.crypto import get_random_string
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


# Create your models here.
class ProductCategory(models.Model):
    type = models.CharField(_("category type"), max_length=50)
    created_at = models.DateTimeField(_("category created at"), auto_now_add=True)

    def __str__(self):
        return f"{self.type.capitalize()}"

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"


class Product(models.Model):
    image = models.ImageField(upload_to="product")
    price = models.PositiveIntegerField()
    title = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(null=True, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    sold = models.BooleanField("sold", default=False)
    active = models.BooleanField("active", default=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title) + "-" + get_random_string(length=6)

        super().save(*args, **kwargs)

    def is_bookmarked(self, user):
        return self.bookmarked_by.filter(user=user).exists()  # type: ignore

    def __str__(self):
        return f"{self.title} | {self.category} | {self.owner}"


class ProductBookmark(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="bookmarked_by"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookmarks")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "user"], name="unique appversion"
            )
        ]


CATEGORIES = [
    "quantum",
    "lan cable",
    "book",
    "lab coat",
    "ed drafter",
    "scientific calculator",
    "cooler",
    "electroics",
    "accessories",
    "others",
]


def add_categories(categories):
    object_iterator = (ProductCategory(type=category) for category in categories)
    ProductCategory.objects.bulk_create(object_iterator)
