from django.contrib import admin
from .models import Equipes

class EquipesAdmin(admin.ModelAdmin):
  list = ('nomeDaEquipe', 'equipeAtual', 'quantidadeIntegrantes', 'quantidadeIntegrantes', 'seConhecem', 'etapaFinalizada', 'definidor', 'facilitador', 'responsavelTempo' ,'linkRetrospectiva1','linkRetrospectiva2','linkRetrospectiva3', 'linkRetrospectiva4')

admin.site.register(Equipes, EquipesAdmin)
