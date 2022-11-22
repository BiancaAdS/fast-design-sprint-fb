from django.urls import path
from .views import EquipesView, CreateEquipesView, EquipeDetailAPIView, EquipeAtividadesView, getRoutes, MyTokenObtainPairView, LoginView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('equipes', EquipesView.as_view()),
    path('equipes/<str:nomeDaEquipe>', EquipeDetailAPIView.as_view()),
    path('create-equipe', CreateEquipesView.as_view()),
    path('atividades-equipes/<str:nomeDaEquipe>', EquipeAtividadesView.as_view()),
    
    path('', getRoutes),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view()),
]
