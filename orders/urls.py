from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_orders),
    path("search/", views.search),
    path("create/", views.create_order),
    path("my/orders/", views.my_orders),
    path("deliver/<int:pk>/", views.delivered),
    path("order/<int:pk>/", views.solo_order),
    path("delete/<int:pk>/", views.delete_product),
]
