from django.conf import settings


def get_absolute_media_url(request, url):
    return request.build_absolute_uri(url)


def get_forgot_password_url(token):
    return f"{settings.WEBAPP_URL}/forgot-password/{token}"


def get_email_verification_url(token):
    return f"{settings.WEBAPP_URL}/email-verification/{token}"


def get_product_detail_page_url(slug):
    return f"{settings.WEBAPP_URL}/item/{slug}"
