from rest_framework import serializers
from api_atividades import models

class EtapasSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Etapa
        fields = '__all__'

class AtividadesEtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AtividadesEtapa
        fields = '__all__'

class HistoricoAtividadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoricoAtividades
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=model.objects.all(),
                fields=('id_atividade', 'id_equipe'),
                message=("Atividade já foi finalizada.")
            )
        ]
    
