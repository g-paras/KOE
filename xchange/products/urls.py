from django.urls import path, include
from rest_framework import routers as rest_routers

from products import views as products_views

router = rest_routers.DefaultRouter()
router.register('', products_views.CreateProductAPIView, '')

urlpatterns = [
    path('', include(router.urls)),
]
