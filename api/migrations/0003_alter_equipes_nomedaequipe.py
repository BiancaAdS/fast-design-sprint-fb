# Generated by Django 4.1 on 2022-09-03 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_equipes_nomedaequipe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipes',
            name='nomeDaEquipe',
            field=models.CharField(default='', max_length=240),
        ),
    ]