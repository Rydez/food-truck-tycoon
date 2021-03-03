# Generated by Django 2.2 on 2019-06-02 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0024_auto_20190601_1824'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='menu_item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='game.MenuItem'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True),
        ),
    ]