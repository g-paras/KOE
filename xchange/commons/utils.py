def get_absolute_media_url(request, url):
    return request.build_absolute_uri(url)
