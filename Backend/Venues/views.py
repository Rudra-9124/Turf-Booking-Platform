from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import VenueSerializer
from .models import Venue
from .serializers import CountSerializer

# Create your views here.
class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class CountView(APIView):
    def get(self, request):
        venues_count = Venue.objects.count()
        data = {
            'venues_count': venues_count,
        }

        serializer = CountSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
