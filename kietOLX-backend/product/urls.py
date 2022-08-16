from django.urls import include, path
from rest_framework import routers

from .views import (
    ProductCreateView,
    ProductRetrieveView,
    ProductUpdateView,
    ProductViewSet,
)

router = routers.DefaultRouter()
router.register("prod", ProductViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("get/<slug:slug>/", ProductRetrieveView.as_view()),
    path("update/<int:pk>/", ProductUpdateView.as_view()),
    path("create/", ProductCreateView.as_view()),
]
