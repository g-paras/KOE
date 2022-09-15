from django.urls import path

from .views import (
    CategoryListView,
    ProductCreateView,
    ProductListAPIView,
    ProductRetrieveView,
    add_remove_bookmark,
    get_bookmarks,
    get_categories,
)

app_name = "products"
urlpatterns = [
    path("", ProductListAPIView.as_view()),
    path("create/", ProductCreateView.as_view()),
    path("category/", CategoryListView.as_view()),
    path("categories/", get_categories, name="categories"),
    path("bookmarks/", get_bookmarks, name="bookmarks"),
    path("add-remove-bookmark/", add_remove_bookmark, name="add-remove-bookmark"),
    path("get/<slug:slug>/", ProductRetrieveView.as_view()),
]
