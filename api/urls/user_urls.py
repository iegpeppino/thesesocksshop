from django.urls import path
from api.views import user_views as views


urlpatterns = [
    path('/', views.getUsers, name='users'),
    path('/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('/register/', views.registerUser, name= 'register'),
    path('/profile/', views.getUserProfile, name= 'user_profile'),
    path('/profile/update/', views.updateUserProfile, name= 'user_profile_update'),

    path('/delete/<str:pk>/' , views.deleteUser, name= 'user_delete'),
    path('/<str:pk>/', views.getUserById, name= 'user_by_id'),
    path('/update/<str:pk>' , views.updateUser, name= 'user_update'),
]
