from django.urls import include, path

from .views import CategoryListView  # ProductUpdateView,; ProductViewSet,
from .views import (ProductCreateView, ProductListAPIView, ProductRetrieveView,
                    create_remove_bookmark, get_categories)

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
    path("add-remove-bookmark/", create_remove_bookmark, name="add-remove-bookmark"),
    path("get/<slug:slug>/", ProductRetrieveView.as_view()),
]
