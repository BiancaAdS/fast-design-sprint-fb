from dataclasses import field
from rest_framework import serializers
from .models import Equipes

class EquipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipes
        fields = ('id', 
                  'nomeDaEquipe', 
                  'quantidadeIntegrantes',
                  'etapaFinalizada', 
                  'definidor', 
                  'facilitador', 
                  'observador', 
                  'entrevistador',
                  'scrumMaster',
                  'atividades',
                  'criadoEm')
    
        
class CreateEquipesSerializer(serializers.ModelSerializer):
    class Meta:
          model = Equipes
          fields = ('nomeDaEquipe', 
                    'quantidadeIntegrantes', 
                    'definidor', 
                    'facilitador', 
                    'observador', 
                    'entrevistador',
                    'scrumMaster',
                    'etapaFinalizada')