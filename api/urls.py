from django.urls import path
from .views import EquipesView, CreateEquipesView, EquipeAPIView, EquipeDetailAPIView

urlpatterns = [
    path('equipes', EquipesView.as_view()),
    path('create-equipe', CreateEquipesView.as_view()),
    path('view-equipe', EquipeAPIView.as_view()),
    path('view-equipe/<str:nomeDaEquipe>', EquipeDetailAPIView.as_view()),
]
