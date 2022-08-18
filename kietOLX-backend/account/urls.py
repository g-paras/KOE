from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from .views import GetUserProfile, UserRetrieveView, UserViewSet

router = routers.DefaultRouter()
router.register("user", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", obtain_auth_token),
    path("get/<str:username>/", UserRetrieveView.as_view()),
    path("my-profile/", GetUserProfile.as_view()),
]
