# Generated by Django 4.1 on 2022-08-28 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_remove_equipes_equipeatual'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipes',
            name='equipeAtual',
            field=models.CharField(default='', max_length=240),
        ),
    ]