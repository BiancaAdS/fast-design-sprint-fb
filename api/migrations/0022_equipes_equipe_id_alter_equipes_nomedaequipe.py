# Generated by Django 4.1 on 2022-08-30 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_alter_equipes_nomedaequipe'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipes',
            name='equipe_id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='equipes',
            name='nomeDaEquipe',
            field=models.CharField(default='', max_length=240),
        ),
    ]
