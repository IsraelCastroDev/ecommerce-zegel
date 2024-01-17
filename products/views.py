from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
import logging
from rest_framework.exceptions import APIException
from rest_framework import status
from django.utils.text import slugify

from .models import Product
from .serializers import ProductSerializer

from backend.pagination import CustomPagination


@api_view(["GET"])
def get_products(request):
    produtcs = Product.objects.all()
    pagination = CustomPagination()
    paginated_products = pagination.paginate_queryset(produtcs, request)
    serializer = ProductSerializer(paginated_products, many=True)
    return pagination.get_paginated_response(serializer.data)


@api_view(["GET"])
def get_product_admin(request, id):
    produtcs = Product.objects.get(id=id)
    serializer = ProductSerializer(produtcs, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, name):
    produtcs = Product.objects.get(name=name)
    serializer = ProductSerializer(produtcs, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_product(request):
    try:
        if request.user.is_staff:
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                name = serializer.validated_data["name"]
                category = serializer.validated_data["name"]
                s = name + category
                slug = slugify(s)
                if serializer.Meta.model.objects.filter(slug=slug).exists():
                    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
                serializer.save(user=request.user, slug=slug)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except APIException as e:
        logging.error(f"Error en la creación del producto: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
def edit_product(request, pk):
    # product = Product.objects.get(pk=pk)
    # if request.user.is_staff:
    #     serializer = ProductSerializer(product, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # return Response(status=status.HTTP_401_UNAUTHORIZED)
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data["name"]
            category = serializer.validated_data["name"]
            s = name + category
            slug = slugify(s)
            if serializer.Meta.model.objects.filter(slug=slug).exists():
                return Response(serializer.data, status.HTTP_400_BAD_REQUEST)
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(["DELETE"])
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
