from django.urls import path
from .views import EquipesView

urlpatterns = [
    path('equipes', EquipesView.as_view())
]
