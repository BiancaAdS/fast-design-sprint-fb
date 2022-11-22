from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework import routers

from api_atividades.atividade_api import viewsets

schema_url_patterns = [
    path('api-atividades/', include('api_atividades.urls')),
]

schema_view = get_schema_view(
   openapi.Info(
      title="Fast Design Sprint API Atividades - Etapas",
      default_version='v1',
      description="API responsável por realizar o controle das atividades de cada etapa da aplicação Fast Design Sprint, juntamente com as etapas.",
    #   terms_of_service="https://www.google.com/policies/terms/",
    #   contact=openapi.Contact(email="contact@snippets.local"),
    #   license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
   patterns=schema_url_patterns,
   urlconf='api_atividades.urls',
   
)

route = routers.DefaultRouter()

route.register(r'atividades', viewsets.AtividadesEtapaViewSet, basename='AtividadesEtapa')
route.register(r'etapas', viewsets.EtapasViewSet, basename='Etapas')
route.register(r'historicoAtividades', viewsets.HistoricoAtividadesViewSet, basename='HistoricoAtividades')


urlpatterns = [

    path('', include(route.urls)),
    
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
