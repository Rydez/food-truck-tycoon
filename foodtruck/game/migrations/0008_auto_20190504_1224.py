# Generated by Django 2.2 on 2019-05-04 12:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_auto_20190503_1848'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Food',
            new_name='MenuItem',
        ),
    ]
