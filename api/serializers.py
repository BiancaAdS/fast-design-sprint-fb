from dataclasses import field
from rest_framework import serializers
from .models import Equipes

class EquipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipes
        fields = ('id', 
                  'nomeDaEquipe', 
                  'quantidadeIntegrantes',
                  'seConhecem', 
                  'etapaFinalizada', 
                  'definidor', 
                  'facilitador', 
                  'observador', 
                  'entrevistador',
                  'scrumMaster',
                  'linkRetrospectiva1', 
                  'linkRetrospectiva2', 
                  'linkRetrospectiva3', 
                  'linkRetrospectiva4', 
                  'created_at'
                )
    
        
class CreateEquipesSerializer(serializers.ModelSerializer):
    class Meta:
          model = Equipes
          fields = ('nomeDaEquipe', 
                    'quantidadeIntegrantes', 
                    'seConhecem', 
                    'definidor', 
                    'facilitador', 
                    'observador', 
                    'entrevistador',
                    'scrumMaster',
                    'etapaFinalizada',
                    'linkRetrospectiva1', 
                    'linkRetrospectiva2', 
                    'linkRetrospectiva3', 
                    'linkRetrospectiva4')