# Generated by Django 4.1 on 2022-08-30 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_equipes_equipe_id_alter_equipes_nomedaequipe'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='equipes',
            name='equipe_id',
        ),
        migrations.AddField(
            model_name='equipes',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]