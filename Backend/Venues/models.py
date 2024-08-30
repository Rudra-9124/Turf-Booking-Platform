from django.db import models
import json 

# Create your models here.
class Venue(models.Model):
    name = models.CharField(max_length=100)
    area = models.CharField(max_length=50)
    location = models.TextField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='venues/')
    facility = models.TextField(max_length=100)
    time = models.CharField(max_length=100)
