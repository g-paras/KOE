from django.urls import include, path
from rest_framework import routers

from .authentication import AuthToken
from .views import (
    GetUserProfile,
    UserRetrieveView,
    UserViewSet,
    request_password_reset,
    resend_email_verification,
    reset_password,
    verify_email,
    BaseApiView
)

app_name = "account"

router = routers.DefaultRouter()
router.register("user", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", AuthToken.as_view()),
    path("get/<str:username>/", UserRetrieveView.as_view()),
    path("my-profile/", GetUserProfile.as_view()),
    path("verify-email/<token>/", verify_email, name="email-verification"),
    path("reset-password/<uid>/<token>/",
         reset_password, name="reset-password"),
    path(
        "resend-email-verification/",
        resend_email_verification,
        name="resend-email-verification",
    ),
    path(
        "request-password-reset/",
        request_password_reset,
        name="request-password-reset",
    ),
    path(
        "base/", BaseApiView.as_view(), name='base'
    )
]
