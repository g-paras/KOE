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
