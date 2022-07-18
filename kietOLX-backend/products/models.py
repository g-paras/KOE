from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Product(models.Model):
    price = models.IntegerField()
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
