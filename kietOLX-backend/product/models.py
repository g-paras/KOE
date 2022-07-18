from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Product(models.Model):
    image = models.ImageField(upload_to="product")
    price = models.PositiveIntegerField()
    title = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
