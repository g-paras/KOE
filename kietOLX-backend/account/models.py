from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    image = models.ImageField()
    phone_no = models.PositiveIntegerField()
    about_me = models.CharField(max_length=250)
    gender = models.CharField(max_length=10)
    user = models.OneToOneField(User, on_delete=models.CASCADE)