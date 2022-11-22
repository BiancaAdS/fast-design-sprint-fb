from django.contrib import admin
from .models import Equipes
from api_atividades.models import  AtividadesEtapa, Etapa, HistoricoAtividades

class HistoricoAtividadesInline(admin.TabularInline):
    model = HistoricoAtividades
    extra = 1

class EquipesAdmin(admin.ModelAdmin):
  inlines = (HistoricoAtividadesInline,)
  list = ('nomeDaEquipe', 'quantidadeIntegrantes', 'quantidadeIntegrantes', 'seConhecem', 'etapaFinalizada', 'definidor', 'facilitador', 'observador' , 'entrevistador' , 'scrumMaster' ,'atividades')



admin.site.register(Equipes, EquipesAdmin)
admin.site.register(AtividadesEtapa)
admin.site.register(Etapa)
admin.site.register(HistoricoAtividades)
