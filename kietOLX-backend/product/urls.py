from django.urls import include, path

from .views import (CategoryListView,  # ProductUpdateView,; ProductViewSet,
                    ProductCreateView, ProductListAPIView, ProductRetrieveView,
                    get_categories)

# from rest_framework import routers


# router = routers.DefaultRouter()
# router.register("prod", ProductViewSet)
app_name = "products"
urlpatterns = [
    # path("", include(router.urls)),
    # path("update/<int:pk>/", ProductUpdateView.as_view()),
    path("", ProductListAPIView.as_view()),
    path("create/", ProductCreateView.as_view()),
    path("category/", CategoryListView.as_view()),
    path("categories/", get_categories, name="categories"),
    path("get/<slug:slug>/", ProductRetrieveView.as_view()),
]
