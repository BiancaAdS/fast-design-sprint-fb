from rest_framework import generics, status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.request import Request
from rest_framework.response import Response

from django.contrib.auth.models import User

from .serializers import EquipesSerializer, CreateEquipesSerializer
from .models import Equipes

from django.contrib.auth import authenticate, login

# Create your views here.

class LoginView(APIView):
    permission_classes = []
   
    def post(self, request: Request):
                
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)

        if user is not None:
            response = {"authenticate": True}
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"authenticate": False})

    def get(self, request: Request):
        content = {"user": str(request.user), "auth": str(request.auth)}

        return Response(data=content, status=status.HTTP_200_OK)    


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   
    @classmethod
    def get_token(cls, user):
        
        token = super().get_token(user)       
        token['username'] = user.username
        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
   

@api_view(['GET'])
def getRoutes (request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)


class EquipesView(generics.ListAPIView):
    queryset = Equipes.objects.all()
    serializer_class = EquipesSerializer

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
            observador = serializer.data.get('observador')    
            entrevistador = serializer.data.get('entrevistador')    
            scrumMaster = serializer.data.get('scrumMaster') 
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
                equipe.observador = observador
                equipe.entrevistador = entrevistador
                equipe.scrumMaster = scrumMaster
                equipe.linkRetrospectiva1 = linkRetrospectiva1
                equipe.linkRetrospectiva2 = linkRetrospectiva2
                equipe.linkRetrospectiva3 = linkRetrospectiva3
                equipe.linkRetrospectiva4 = linkRetrospectiva4
                equipeAtual = self.request.session.session_key
             
                equipe.save(update_fields=['equipeAtual','nomeDaEquipe', 'quantidadeIntegrantes', 'etapaFinalizada','seConhecem', 'definidor', 'facilitador', 'observador', 'entrevistador', 'scrumMaster','linkRetrospectiva1', 'linkRetrospectiva2', 'linkRetrospectiva3', 'linkRetrospectiva4'])
                return Response(EquipesSerializer(equipe).data, status=status.HTTP_200_OK)
            else:
                user = User.objects.create_user(username=nomeDaEquipe, first_name=nomeDaEquipe, password=nomeDaEquipe)
                user.save()
                equipe = Equipes(equipeAtual=equipeAtual, nomeDaEquipe=nomeDaEquipe, quantidadeIntegrantes=quantidadeIntegrantes, seConhecem=seConhecem, definidor=definidor, facilitador=facilitador, observador=observador, entrevistador=entrevistador, scrumMaster=scrumMaster,etapaFinalizada=etapaFinalizada, linkRetrospectiva1=linkRetrospectiva1, linkRetrospectiva2=linkRetrospectiva2, linkRetrospectiva3=linkRetrospectiva3, linkRetrospectiva4=linkRetrospectiva4)
                equipe.save()
                return Response(EquipesSerializer(equipe).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
            
                
