from rest_framework import serializers
from .models import Venue

class VenueSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Venue
        fields = '__all__'

class CountSerializer(serializers.Serializer):
    venues_count = serializers.IntegerField()