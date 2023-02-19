from django.contrib import admin

from products import models as products_models

admin.site.register(products_models.Product)
admin.site.register(products_models.Bookmark)
admin.site.register(products_models.Offer)