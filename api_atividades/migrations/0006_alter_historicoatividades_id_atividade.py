# Generated by Django 4.1 on 2022-11-20 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_atividades', '0005_alter_atividadesetapa_id_atividade_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicoatividades',
            name='id_atividade',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_atividades.atividadesetapa', unique=True),
        ),
    ]
