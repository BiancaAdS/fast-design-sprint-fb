from django.db import models
from uuid import uuid4

# from api.models import Equipes


# Create your models here.
  
class Etapa(models.Model):
    id_etapa = models.AutoField(primary_key=True, editable=False, unique=True)
    nomeEtapa = models.CharField(max_length=60, default="", blank=True)
    proxima = models.OneToOneField('self', on_delete=models.CASCADE,related_name='proximaEtapa', null=True, blank=True, default="")
    

class AtividadesEtapa(models.Model):
    id_atividade = models.AutoField(primary_key=True, editable=False, unique=True)
    titulo = models.CharField(max_length=500, default="", blank=True)
    tituloAtividade = models.CharField(max_length=500, default="", blank=True)
    tipo = models.CharField(max_length=60, default="", blank=True)
    descricao = models.CharField(max_length=3800, default="", blank=True)
    link = models.CharField(max_length=500, default="", blank=True)
    descricaoLink = models.CharField(max_length=500, default="", blank=True)
    tempoEstimado = models.IntegerField(default=0, blank=True)
    proxima = models.OneToOneField('self', null=True, on_delete=models.CASCADE, related_name='proximaAtividade', default="")
    etapaPertencente = models.ForeignKey(Etapa, on_delete=models.CASCADE, related_name='etapaPertencente')
    criadoEm = models.DateTimeField(auto_now_add=True)
    
class HistoricoAtividades(models.Model):
    id_atividade = models.ForeignKey(AtividadesEtapa, on_delete=models.CASCADE)
    id_equipe = models.ForeignKey('api.Equipes', on_delete=models.CASCADE)
    informacaoExtra = models.CharField(max_length=240, default="", blank=True)
    etapaAtividade = models.IntegerField(default=1, blank=True)
    
    class Meta:
        unique_together = (("id_atividade", "id_equipe"),)
