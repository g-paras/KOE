from django.urls import include, path
from  rest_framework import routers
from  rest_framework.authtoken.views import obtain_auth_token

from  .views import UserViewSet

router = routers.DefaultRouter()
router.register('user', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', obtain_auth_token)
]