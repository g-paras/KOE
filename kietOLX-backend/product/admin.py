from django.contrib import admin

from .models import Product, ProductBookmark, ProductCategory


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["pk", "owner", "title", "category", "price", "created_at"]


@admin.register(ProductBookmark)
class ProductBookmarkAdmin(admin.ModelAdmin):
    list_display = ["product", "user"]


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ["type", "created_at"]
