# Generated by Django 4.1 on 2022-11-19 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_equipes_linkretrospectiva1_and_more'),
        ('api_atividades', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipes',
            name='atividades',
            field=models.ManyToManyField(related_name='atividades', to='api_atividades.atividadesetapa'),
        ),
    ]
