# Generated by Django 4.1 on 2022-11-20 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_atividades', '0012_alter_historicoatividades_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicoatividades',
            name='etapaAtividade',
            field=models.IntegerField(blank=True, default=1),
        ),
    ]
