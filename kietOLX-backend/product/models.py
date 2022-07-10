from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    image = models.ImageField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)