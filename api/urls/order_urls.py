from django.urls import path
from api.views import order_views as views

urlpatterns = [
    path('/', views.getOrders, name ='get_order'),
    path('/add/', views.addOrderItems, name= 'add_order_item'),
    path('/myorders/', views.getMyOrders, name= 'my_orders'),
    path('/<str:pk>/deliver/', views.updateOrderToDelivered, name= 'delivered'),
    path('/<str:pk>/pay/', views.updateOrderToPaid, name= 'paid'),
    path('/<str:pk>/', views.getOrderById, name= 'user_order'),
    
]
