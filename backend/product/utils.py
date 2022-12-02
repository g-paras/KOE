from django.core.mail import send_mail
from django.template.loader import render_to_string

from .models import ProductCategory

CATEGORIES = [
    "quantum",
    "lan cable",
    "book",
    "lab coat",
    "ed drafter",
    "scientific calculator",
    "cooler",
    "electronics",
    "accessories",
    "others",
]


def create_categories(categories=CATEGORIES):
    for category in categories:
        if ProductCategory.objects.filter(type__icontains=category).exists():
            continue
        else:
            ProductCategory.objects.create(type=category)


def send_offer_mail(user, product):
    owner = product.owner
    html_message = render_to_string(
        "email/make_offer.html", {"user": user, "product": product, "owner": owner}
    )
    send_mail(
        subject="Someone made you a offer",
        message="Someone made you a offer",
        from_email="KietOLX Product Team",
        recipient_list=[owner.email],
        html_message=html_message,
    )
