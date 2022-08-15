from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('etapa1', index),
    path('etapa2', index),
    path('etapa3', index),
    path('etapa4', index)
]
