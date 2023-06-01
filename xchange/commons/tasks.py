from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404

from accounts import utils as accounts_utils
from accounts import models as accounts_models
from commons import utils as commons_utils
from products import models as products_models


@shared_task
def send_verification_email(user_id):
    user = get_object_or_404(accounts_models.CustomUser, id=user_id)
    token = accounts_utils.EmailVerificationTokenGenerator.create_token(user)

    message = render_to_string('email/base.html', context={
        'title': 'Email Verification',
        'full_name': f"{user.first_name} {user.last_name}",
        'action_btn_text': 'Click Here',
        'action_url': commons_utils.get_email_verification_url(token),
        'message': 'we are glad to have you on our platform. Please follow the link below to activate your account.',
    })

    send_mail(
        subject="Email Verification",
        message="Please verify your account",
        from_email="KOE Support Team",
        recipient_list=[user.email],
        html_message=message,
    )


@shared_task
def send_forgot_password_email(user_id):
    user = get_object_or_404(accounts_models.CustomUser, id=user_id)
    token = accounts_utils.EmailVerificationTokenGenerator.create_token(user)
    token = accounts_utils.ResetPasswordTokenGenerator.create_token(user)

    message = render_to_string('email/base.html', context={
        'title': 'Forgot Password',
        'full_name': f"{user.first_name} {user.last_name}",
        'action_btn_text': 'Click Here',
        'action_url': commons_utils.get_forgot_password_url(token),
        'message': 'please find the link below to reset you account password.',
    })

    send_mail(
        subject="Forgot Password Email",
        message="Please verify your account",
        from_email="KOE Support Team",
        recipient_list=[user.email],
        html_message=message,
    )


@shared_task
def send_offer_made_email(user_id, product_id):
    user = get_object_or_404(accounts_models.CustomUser, id=user_id)
    product = get_object_or_404(products_models.Product, id=product_id)
    context = {
        'title': 'Someone made an offer',
        'full_name': f"{product.owner.first_name} {product.owner.last_name}",
        'action_btn_text': 'View Details',
        'action_url': commons_utils.get_product_detail_page_url(product.slug),
        'message': f'we are glad to inform you that <b>{user.first_name} {user.last_name}</b> has made an offer on your ad <b>{product.title}</b>. You can contact them via email <b>{user.email}</b>. Please follow the link below to view details.',
    }

    message = render_to_string('email/base.html', context=context)
    send_mail(
        subject="Some made an offer",
        message="Someone made an offer on your product",
        from_email="KoE Support Team",
        recipient_list=[product.owner.email],
        html_message=message,
    )


@shared_task
def send_offer_accept_reject_email(user_id, product_id, accepted):
    user = get_object_or_404(accounts_models.CustomUser, id=user_id)
    product = get_object_or_404(products_models.Product, id=product_id)
    context = {
        'title': 'Offer Accepted' if accepted else 'Offer Rejected',
        'full_name': f"{user.first_name} {user.last_name}",
        'action_btn_text': 'View Details',
        'action_url': commons_utils.get_product_detail_page_url(product.slug),
        'message': f"we {'are glad' if accepted else 'regret'} to inform you that <b>{product.owner.first_name} {product.owner.last_name}</b> has {'accepted' if accepted else 'rejected'} you offer for the product <b>{product.title}</b>. Please follow the link below to view details.",
    }

    message = render_to_string('email/base.html', context=context)
    send_mail(
        subject="Offer Accepted" if accepted else "Offer Rejected",
        message=f"Your offer has been {'accepted' if accepted else 'rejected'}",
        from_email="KoE Support Team",
        recipient_list=[user.email],
        html_message=message,
    )
