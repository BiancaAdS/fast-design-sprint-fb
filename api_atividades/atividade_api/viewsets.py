from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from api_atividades.atividade_api import serializers
from api_atividades import models

from rest_framework.decorators import parser_classes
from rest_framework.parsers import FormParser

from api_atividades.models import HistoricoAtividades

from django.db import IntegrityError
from django.core.exceptions import ValidationError

from rest_framework.response import Response

@parser_classes([FormParser]) 
class AtividadesEtapaViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AtividadesEtapaSerializer
    queryset = models.AtividadesEtapa.objects.all()
    
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['criado_em', 'proxima']
    filterset_fields = ['etapaPertencente', 'tituloAtividade']

@parser_classes([FormParser]) 
class EtapasViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.EtapasSerializer
    queryset = models.Etapa.objects.all()
    
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['proxima']
    
class HistoricoAtividadesViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.HistoricoAtividadesSerializer
    queryset = models.HistoricoAtividades.objects.all()
    
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['id_equipe', 'etapaAtividade', 'id_atividade']
    ordering_fields = ['id_atividade']
    
   

            
            
