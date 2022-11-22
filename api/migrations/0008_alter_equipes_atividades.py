# Generated by Django 4.1 on 2022-11-19 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_atividades', '0005_alter_atividadesetapa_id_atividade_and_more'),
        ('api', '0007_alter_equipes_atividades'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipes',
            name='atividades',
            field=models.ManyToManyField(default='', null=True, related_name='atividades', through='api_atividades.HistoricoAtividades', to='api_atividades.atividadesetapa'),
        ),
    ]
