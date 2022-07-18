from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from .views import UserRetrieveView, UserViewSet

router = routers.DefaultRouter()
router.register("user", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", obtain_auth_token),
    re_path("^(?P<username>.+)/$", UserRetrieveView.as_view()),
]
