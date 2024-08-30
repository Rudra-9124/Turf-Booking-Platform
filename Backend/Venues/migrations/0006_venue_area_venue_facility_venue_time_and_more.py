# Generated by Django 5.1 on 2024-08-29 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Venues', '0005_remove_venue_sports'),
    ]

    operations = [
        migrations.AddField(
            model_name='venue',
            name='area',
            field=models.CharField(default='Default Area', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='venue',
            name='facility',
            field=models.TextField(default='unknown', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='venue',
            name='time',
            field=models.CharField(default='unknown', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='venue',
            name='location',
            field=models.TextField(max_length=100),
        ),
    ]
