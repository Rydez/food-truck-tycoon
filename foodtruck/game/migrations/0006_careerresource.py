# Generated by Django 2.2 on 2019-05-03 18:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0005_auto_20190503_1808'),
    ]

    operations = [
        migrations.CreateModel(
            name='CareerResource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.DecimalField(decimal_places=2, default=0, max_digits=8)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('career', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resources', to='game.Career')),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='careers', to='game.Career')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
