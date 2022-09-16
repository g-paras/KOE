from django.urls import path

from .views import (
    CategoryListView,
    ProductCreateView,
    ProductListAPIView,
    ProductRetrieveView,
    add_remove_bookmark,
    get_bookmarks,
    get_my_ads,
    make_offer,
    search_product,
)

app_name = "products"
urlpatterns = [
    path("", ProductListAPIView.as_view()),
    path("create/", ProductCreateView.as_view()),
    path("category/", CategoryListView.as_view()),
    path("bookmarks/", get_bookmarks, name="bookmarks"),
    path("search/<query>/", search_product, name="search-products"),
    path("my-ads/", get_my_ads, name="my-ads"),
    path("make-offer/", make_offer, name="make-offer"),
    path("add-remove-bookmark/", add_remove_bookmark, name="add-remove-bookmark"),
    path("get/<slug:slug>/", ProductRetrieveView.as_view()),
]
