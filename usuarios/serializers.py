from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # modelo a usar
        fields = ["email", "name", "last_name", "id"]


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # modelo a usar
        fields = ["email", "name", "last_name", "password"]


class MyTokenObtainPairSerializar(TokenObtainPairSerializer):
    # obtener token
    @classmethod
    def get_token(cls, user) -> Token:
        token = super().get_token(user)

        # estos campos aparecen en el token
        token["email"] = user.email
        token["is_staff"] = user.is_staff
        token["name"] = user.name
        token["last_name"] = user.last_name

        return token
