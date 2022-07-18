from django.contrib.auth.models import User
from rest_framework import generics, viewsets

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = "username"
    queryset = User.objects.all()

    # def get_queryset(self):
    #     """
    #     This view should return a list of all the purchases for
    #     the user as determined by the username portion of the URL.
    #     """
    #     username = self.kwargs["username"]
    #     return User.objects.get(username=username)
