from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password  # hashear la contraseña en la bd
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from rest_framework import status

from .models import User
from .serializers import (
    UserSerializer,
    RegisterUserSerializer,
    MyTokenObtainPairSerializar,
)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_solo_user(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["PUT"])
def edit_profile(request, email):
    user = User.objects.get(email=email)
    if request.user.email == email:
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(["DELETE"])
def delete_user(request, pk):
    user = User.objects.get(pk=pk)
    if request.user.is_staff:
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


# Create your views here.
@api_view(["GET"])
def get_users(request):
    if request.user.is_staff:
        users = User.objects.exclude(email="admin@zegel.com")
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def register(request):
    data = request.data
    user = User.objects.create(
        email=data["email"],
        name=data["name"],
        last_name=data["last_name"],
        password=make_password(data["password"]),
    )

    serializer = RegisterUserSerializer(user, many=False)
    return Response(serializer.data)


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializar
