# models.py
from django.db import models

class Booking(models.Model):
    user = models.CharField(max_length=100, blank=True, null=True)
    venue_name = models.CharField(max_length=255)
    sport = models.CharField(max_length=100)
    date = models.DateField()
    time = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    email = models.EmailField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user} - {self.venue_name} - {self.sport}"