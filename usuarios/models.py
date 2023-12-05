from typing import Any
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager


# Create your models here.
# Modelo de usuario personalizado
class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Debes ingresar un correo electrónico")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    # crear un usuario normal
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)  # is_staff = es admin
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)  # is_staff = es admin
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=150, null=True)
    last_name = models.CharField(max_length=200, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    address = models.CharField(max_length=200, null=True)
    dni = models.CharField(max_length=8, null=True)
    phone = models.CharField(max_length=9, null=True)
    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ["-date_joined"]  # fecha de creacion de usuario
