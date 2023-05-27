from django.urls import path

from accounts import views as accounts_views

app_name = "accounts"

urlpatterns = [
    path('register/', accounts_views.UserRegistrationView.as_view(), name='register'),
    path('login/', accounts_views.UserLoginAPIView.as_view(), name='login'),
    path('base/', accounts_views.BaseAPIView.as_view(), name='base'),
]
