from dataclasses import field
from rest_framework import serializers
from .models import Equipes

class EquipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipes
        fields = ('id', 
                  'nomeEquipe', 
                  'quantidadeIntegrantes',
                  'seConhecem', 
                  'etapaFinalizada', 
                  'definidor', 
                  'facilitador', 
                  'responsavelTempo', 
                  'linkRetrospectiva1', 
                  'linkRetrospectiva2', 
                  'linkRetrospectiva3', 
                  'linkRetrospectiva4', 
                  'created_at'
                )
        