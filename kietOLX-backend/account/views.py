from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = "username"
    queryset = User.objects.all()


class GetUserProfile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request, format=None):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)

    # def get_queryset(self):
    #     username = self.kwargs["username"]
    #     return User.objects.get(username=username)
