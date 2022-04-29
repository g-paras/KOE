from django.urls import path, include
from rest_framework import routers
from .views import ProductView, CategoryView

router = routers.DefaultRouter()
router.register('products', ProductView)
router.register('category', CategoryView)

urlpatterns = [
    path('', include(router.urls))
]