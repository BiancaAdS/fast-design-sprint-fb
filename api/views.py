from urllib import request
from django.shortcuts import render
from rest_framework import generics, status

from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers import EquipesSerializer, CreateEquipesSerializer
from .models import Equipes

# Create your views here.

class EquipesView(generics.ListAPIView):
    queryset = Equipes.objects.all()
    serializer_class = EquipesSerializer
    
class EquipeAPIView(APIView):
    
    def get(self, request):
        equipe= Equipes.objects.all()
        serializer= EquipesSerializer(equipe, many=True)
        return Response(serializer.data)
    
class EquipeDetailAPIView(APIView):
    
    def get(self, request, nomeDaEquipe):
        equipe= Equipes.objects.filter(nomeDaEquipe=nomeDaEquipe)
        if(equipe.exists()):
            serializer= EquipesSerializer(equipe[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({})


class CreateEquipesView(APIView):
    serializer_class = CreateEquipesSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if(serializer.is_valid()):
            nomeDaEquipe = serializer.data.get('nomeDaEquipe')
            quantidadeIntegrantes =  serializer.data.get('quantidadeIntegrantes')
            seConhecem = serializer.data.get('seConhecem')
            definidor = serializer.data.get('definidor')
            facilitador = serializer.data.get('facilitador')
            responsavelTempo = serializer.data.get('responsavelTempo')
            etapaFinalizada = serializer.data.get('etapaFinalizada')
            linkRetrospectiva1 = serializer.data.get('linkRetrospectiva1')
            linkRetrospectiva2 = serializer.data.get('linkRetrospectiva2')
            linkRetrospectiva3 = serializer.data.get('linkRetrospectiva3')
            linkRetrospectiva4 = serializer.data.get('linkRetrospectiva4')
            equipeAtual = self.request.session.session_key
            queryset = Equipes.objects.filter(nomeDaEquipe=nomeDaEquipe)
            if(queryset.exists()):
                equipe = queryset[0]
                equipe.nomeDaEquipe = nomeDaEquipe
                equipe.quantidadeIntegrantes =  quantidadeIntegrantes
                equipe.etapaFinalizada = etapaFinalizada
                equipe.seConhecem = seConhecem
                equipe.definidor = definidor
                equipe.facilitador = facilitador
                equipe.responsavelTempo = responsavelTempo
                equipe.linkRetrospectiva1 = linkRetrospectiva1
                equipe.linkRetrospectiva2 = linkRetrospectiva2
                equipe.linkRetrospectiva3 = linkRetrospectiva3
                equipe.linkRetrospectiva4 = linkRetrospectiva4
                equipe.save(update_fields=['equipeAtual','nomeDaEquipe', 'quantidadeIntegrantes', 'etapaFinalizada','seConhecem', 'definidor', 'facilitador', 'responsavelTempo', 'linkRetrospectiva1', 'linkRetrospectiva2', 'linkRetrospectiva3', 'linkRetrospectiva4'])
                return Response(EquipesSerializer(equipe).data, status=status.HTTP_200_OK)
            else:
                equipe = Equipes(equipeAtual=equipeAtual, nomeDaEquipe=nomeDaEquipe, quantidadeIntegrantes=quantidadeIntegrantes, seConhecem=seConhecem, definidor=definidor, facilitador=facilitador, responsavelTempo=responsavelTempo, etapaFinalizada=etapaFinalizada, linkRetrospectiva1=linkRetrospectiva1, linkRetrospectiva2=linkRetrospectiva2, linkRetrospectiva3=linkRetrospectiva3, linkRetrospectiva4=linkRetrospectiva4)
                equipe.save()
                return Response(EquipesSerializer(equipe).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
            
                
