from django.db import models

# Create your models here.
class Equipes(models.Model):
    nomeEquipe = models.CharField(max_length=240, unique=True)
    quantidadeIntegrantes = models.IntegerField()
    seConhecem = models.BooleanField(null=False, default=False)
    etapaFinalizada = models.CharField(max_length=35)
    definidor = models.CharField(max_length=35)
    facilitador = models.CharField(max_length=35)
    responsavelTempo = models.CharField(max_length=35)
    linkRetrospectiva1 = models.CharField(max_length=240)
    linkRetrospectiva2 = models.CharField(max_length=240)
    linkRetrospectiva3 = models.CharField(max_length=240)
    linkRetrospectiva4 = models.CharField(max_length=240)
    created_at = models.DateTimeField(auto_now_add=True)