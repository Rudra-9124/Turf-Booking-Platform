# Generated by Django 5.1 on 2024-08-27 09:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Venues', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='venue',
            name='area',
        ),
    ]
