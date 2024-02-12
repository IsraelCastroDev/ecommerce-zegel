from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Order, Orderitem, ShippingAddress
from .serializers import OrderSerializer
from products.models import Product


@api_view(["DELETE"])
def delete_product(request, pk):
    order = Order.objects.get(pk=pk)
    if request.user.is_staff:
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def search(request):
    query = request.query_params.get("query")
    if query is None:
        query = ""
    order = Order.objects.filter(user__email__icontains=query)
    serializer = OrderSerializer(order, many=True)
    return Response({"orders": serializer.data})


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    # Obtiene el usuario actual y los datos de la solicitud
    user = request.user
    data = request.data
    orderItems = data["order_items"]
    total_price = data["total_price"]

    # Calcula la suma de precios de los elementos de la orden
    sum_of_prices = sum(
        int(float(item["price"])) * item["quantity"] for item in orderItems
    )

    # Comprueba si la suma de precios coincide con el precio total proporcionado
    if total_price == sum_of_prices:
        # Crea una instancia de la clase Order y la almacena en la base de datos
        order = Order.objects.create(user=user, total_price=total_price)

        # Crea una instancia de ShippingAddress relacionada con la orden y la almacena
        ShippingAddress.objects.create(
            order=order,
            address=data["address"],
            city=data["city"],
            postal_code=data["postal_code"],
        )

        # Itera sobre los elementos de la orden
        for i in orderItems:
            # Obtiene el producto relacionado con el elemento de la orden
            product = Product.objects.get(id=i["id"])

            # Crea una instancia de Orderitem y la almacena en la base de datos
            item = Orderitem.objects.create(
                product=product, order=order, quantity=i["quantity"], price=i["price"]
            )

            # Actualiza la cantidad disponible del producto en stock
            product.count_in_stock -= item.quantity
            product.save()

        # Serializa la orden creada y la devuelve como respuesta con código de estado 201
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # Devuelve un mensaje de error con la suma de precios si no coinciden
        return Response({"mensaje": sum_of_prices}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def solo_order(request, pk):
    user = request.user
    try:
        order = Order.objects.get(pk=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response(
                {"detail": "No tienes acceso"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
    except:
        return Response(
            {"detail": "La orden no existe"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def delivered(request, pk):
    order = Order.objects.get(pk=pk)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()
    return Response("La orden ha sido entregada")
