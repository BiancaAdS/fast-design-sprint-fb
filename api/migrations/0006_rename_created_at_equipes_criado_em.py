# Generated by Django 4.1 on 2022-11-19 15:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_equipes_atividades'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equipes',
            old_name='created_at',
            new_name='criado_em',
        ),
    ]
