from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from accounts import utils as accounts_utils

@shared_task
def send_verification_email(user):
    token = accounts_utils.EmailVerificationTokenGenerator.create_token(user)

    context = {
        'username': user.username,
        'email': user.email,
        'url': accounts_utils.get_verification_url(token),
    }

    message = render_to_string('', context=context)
    send_mail(
        subject="Email Verification",
        message="Please verify your account",
        from_email="KoE Support Team",
        recipient_list=[user.email],
        html_message=message,
    )
