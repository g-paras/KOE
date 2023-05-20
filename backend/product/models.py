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
    price = models.PositiveIntegerField()
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50)
    image = models.ImageField(upload_to="product")
    description = models.CharField(max_length=255)
    slug = models.SlugField(null=True, unique=True)
    updated_at = models.DateTimeField(auto_now=True)
    sold = models.BooleanField("sold", default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField("active", default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title) + "-" + get_random_string(length=6)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} | {self.category} | {self.owner}"

    class Meta:
        indexes = [models.Index(fields=["slug"])]


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
        verbose_name = "Bookmark"
        verbose_name_plural = "Bookmarks"


class Offer(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
