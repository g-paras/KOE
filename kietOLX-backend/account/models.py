from django.contrib.auth.models import User
from django.db import models


class Gender(models.TextChoices):
    male = "M", "Male"
    female = "F", "Female"
    anonymous = "A", "Anonymous"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    image = models.ImageField(upload_to="profile", default="profile/avatar_3.png")
    gender = models.CharField(null=True, choices=Gender.choices, max_length=1)
    phone_no = models.CharField(max_length=10, null=True)
    about_me = models.CharField(default="I have something to sell", max_length=250)

    def __str__(self):
        return f"{self.user} | {self.gender}"
