from django.shortcuts import render
from rest_framework import generics

from .serializers import EquipesSerializer
from .models import Equipes

# Create your views here.

class EquipesView(generics.ListAPIView):
    queryset = Equipes.objects.all()
    serializer_class = EquipesSerializer

