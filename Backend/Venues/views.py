from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Venue
from .serializers import VenueSerializer

# View to list venues with optional search filtering
class VenueViewSet(generics.ListAPIView):
    queryset = Venue.objects.all()  # Default queryset for all venues
    serializer_class = VenueSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None) 
        sport = self.request.query_params.get('sports', None) 
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(area__icontains=search)
            )

        # Filter by selected sport if provided
        if sport:
            queryset = queryset.filter(sports__icontains=sport)

        return queryset

# View to return counts of venues (and can be extended for other counts)
class CountView(APIView):
    def get(self, request):
        venues_count = Venue.objects.count()  
        data = {
            'venues_count': venues_count
        }
        return Response(data)  

# View to retrieve the details of a specific venue by ID
class VenueDetailView(generics.RetrieveAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    lookup_field = 'id'  # This ensures the view looks for the venue by 'id'