# Generated by Django 4.1 on 2022-11-19 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_atividades', '0002_alter_etapa_proxima'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='atividadesetapa',
            name='descricaoTempo',
        ),
    ]