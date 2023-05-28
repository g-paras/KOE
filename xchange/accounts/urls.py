from django.urls import path

from accounts import views as accounts_views

app_name = "accounts"

urlpatterns = [
    path('register/', accounts_views.UserRegistrationView.as_view(), name='register'),
    path('login/', accounts_views.UserLoginAPIView.as_view(), name='login'),
    path('base/', accounts_views.BaseAPIView.as_view(), name='base'),
    path('email-verification/', accounts_views.EmailVerificationAPIView.as_view(), name='email-verification'),
    path('resend-verification-email/', accounts_views.ResendVerificationEmailAPIView.as_view(), name='resend-verification-email'),
    path('set-password/', accounts_views.SetPasswordAPIView.as_view(), name='set-password'),
    path('profile/', accounts_views.EditProfileAPIView.as_view(), name='edit-profile'),
    path('forgot-password/', accounts_views.RequestForgotPasswordAPIView.as_view(), name='request-forgot-password'),
    path('set-forgot-password/', accounts_views.ForgotPasswordAPIView.as_view(), name='set-forgot-password'),
]
