from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from .serializers import GroupSerializer


class AuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]  # type: ignore
        if user.groups.filter(name="NOT_VERIFIED").exists():
            return Response(
                "Email not verified, kindly verify your email first",
                status=status.HTTP_412_PRECONDITION_FAILED,
            )
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "permissions": GroupSerializer(user.groups, many=True).data,
            }
        )
