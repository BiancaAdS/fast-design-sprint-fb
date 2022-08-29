from django.db import models

# Create your models here.
class Equipes(models.Model):
    nomeDaEquipe = models.CharField(max_length=240, default="")
    equipeAtual = models.CharField(max_length=240, default="")
    quantidadeIntegrantes = models.IntegerField()
    seConhecem = models.BooleanField(null=False, default=False)
    etapaFinalizada = models.CharField(max_length=35, default="", blank=True)
    definidor = models.CharField(max_length=35, default="", blank=True)
    facilitador = models.CharField(max_length=35, default="", blank=True)
    responsavelTempo = models.CharField(max_length=35, default="", blank=True)
    linkRetrospectiva1 = models.CharField(max_length=240, default="", blank=True)
    linkRetrospectiva2 = models.CharField(max_length=240, default="", blank=True)
    linkRetrospectiva3 = models.CharField(max_length=240, default="", blank=True)
    linkRetrospectiva4 = models.CharField(max_length=240, default="", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)