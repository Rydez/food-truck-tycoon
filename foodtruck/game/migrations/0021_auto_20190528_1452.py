# Generated by Django 2.2 on 2019-05-28 14:52

from django.db import migrations, models
import django.db.models.deletion
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0020_auto_20190526_2033'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='truck_position',
            field=django_mysql.models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='day',
            name='career',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='days', to='game.Career'),
        ),
    ]
