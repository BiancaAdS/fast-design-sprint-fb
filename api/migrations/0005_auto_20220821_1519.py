# Generated by Django 2.2.15 on 2022-08-21 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20220821_1420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva1',
            field=models.CharField(default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva2',
            field=models.CharField(default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva3',
            field=models.CharField(default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='equipes',
            name='linkRetrospectiva4',
            field=models.CharField(default='', max_length=240),
        ),
    ]
