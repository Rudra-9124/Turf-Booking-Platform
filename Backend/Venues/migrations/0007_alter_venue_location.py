# Generated by Django 5.1 on 2024-08-29 12:30
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Venues', '0006_venue_area_venue_facility_venue_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venue',
            name='location',
            field=models.TextField(max_length=255),
        ),
    ]
