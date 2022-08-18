from django.urls import include, path

from .views import ProductCreateView  # ProductUpdateView,; ProductViewSet,
from .views import ProductListAPIView, ProductRetrieveView

# from rest_framework import routers


# router = routers.DefaultRouter()
# router.register("prod", ProductViewSet)

urlpatterns = [
    # path("", include(router.urls)),
    # path("update/<int:pk>/", ProductUpdateView.as_view()),
    path("", ProductListAPIView.as_view()),
    path("create/", ProductCreateView.as_view()),
    path("get/<slug:slug>/", ProductRetrieveView.as_view()),
]
