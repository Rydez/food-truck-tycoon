# Generated by Django 2.2 on 2019-05-26 20:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0019_auto_20190525_1330'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='popularity',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='menuitem',
            name='popularity',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('headline', models.CharField(max_length=500)),
                ('max_temp', models.SmallIntegerField()),
                ('min_temp', models.SmallIntegerField()),
                ('dawn_condition', models.CharField(choices=[('sunny', 'sunny'), ('cloudy', 'cloudy'), ('rainy', 'rainy'), ('stormy', 'stormy')], max_length=50)),
                ('noon_condition', models.CharField(choices=[('sunny', 'sunny'), ('cloudy', 'cloudy'), ('rainy', 'rainy'), ('stormy', 'stormy')], max_length=50)),
                ('dusk_condition', models.CharField(choices=[('sunny', 'sunny'), ('cloudy', 'cloudy'), ('rainy', 'rainy'), ('stormy', 'stormy')], max_length=50)),
                ('career', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='game.Career')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
