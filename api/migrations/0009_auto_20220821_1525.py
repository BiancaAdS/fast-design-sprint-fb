# Generated by Django 2.2.15 on 2022-08-21 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20220821_1523'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipes',
            name='etapaFinalizada',
            field=models.CharField(blank=True, default='', max_length=35),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva1',
            field=models.CharField(blank=True, default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva2',
            field=models.CharField(blank=True, default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva3',
            field=models.CharField(blank=True, default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva4',
            field=models.CharField(blank=True, default='', max_length=240),
        ),
    ]