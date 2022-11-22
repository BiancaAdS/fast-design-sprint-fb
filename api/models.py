from django.db import models

from api_atividades.models import AtividadesEtapa, HistoricoAtividades

class Equipes(models.Model):
    nomeDaEquipe = models.CharField(max_length=240, default="")
    equipeAtual = models.CharField(max_length=240, default="")
    quantidadeIntegrantes = models.IntegerField()
    etapaFinalizada = models.CharField(max_length=35, default="", blank=True)
    definidor = models.CharField(max_length=35, default="", blank=True)
    facilitador = models.CharField(max_length=35, default="", blank=True)
    observador = models.CharField(max_length=35, default="", blank=True)
    entrevistador = models.CharField(max_length=35, default="", blank=True)
    scrumMaster = models.CharField(max_length=35, default="", blank=True)
    
    atividades = models.ManyToManyField(AtividadesEtapa, related_name='atividades', default="", through=HistoricoAtividades, blank=True)
     
    criadoEm = models.DateTimeField(auto_now_add=True)
