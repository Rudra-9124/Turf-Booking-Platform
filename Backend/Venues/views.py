# from django.db.models import Q
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.shortcuts import render
# from rest_framework import viewsets
# from .serializers import VenueSerializer
# from .models import Venue
# from .serializers import CountSerializer
# from rest_framework import generics


# # # Create your views here.
# # class VenueViewSet(viewsets.ModelViewSet):
# #     queryset = Venue.objects.all()
# #     serializer_class = VenueSerializer

# class VenueViewSet(generics.ListAPIView):
#     queryset = Venue.objects.all()  # Ensure this is defined
#     serializer_class = VenueSerializer

#     def get_queryset(self):
#         queryset = Venue.objects.all()
#         search = self.request.query_params.get('search', None)
#         if search:
#             queryset = queryset.filter(
#                 Q(name__icontains=search) | Q(area__icontains=search)
#             )
#         return queryset
    
# class CountView(APIView):
#     def get(self, request):
#         venues_count = Venue.objects.count()
#         data = {
#             'venues_count': venues_count,
#         }

#         serializer = CountSerializer(data=data)
#         if serializer.is_valid():
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)


# from django.db.models import Q
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import generics
# from .models import Venue
# from .serializers import VenueSerializer, CountSerializer


# # View to list venues with optional search filtering
# class VenueViewSet(generics.ListAPIView):
#     queryset = Venue.objects.all()  # Default queryset for all venues
#     serializer_class = VenueSerializer

#     def get_queryset(self):
#         """
#         This method overrides the default get_queryset method to provide 
#         filtering based on the 'search' query parameter.
#         """
#         queryset = Venue.objects.all()
#         search = self.request.query_params.get('search', None)  # Get the 'search' parameter from the request
#         if search:
#             # Filter queryset based on venue name or area containing the search term
#             queryset = queryset.filter(
#                 Q(name__icontains=search) | Q(area__icontains=search)
#             )
#         return queryset

# # View to return counts of different entities, e.g., venues
# class CountView(APIView):
#     def get(self, request):
#         """
#         This method returns the count of venues and can be expanded 
#         to include other counts as necessary.
#         """
#         venues_count = Venue.objects.count()  # Get the total count of venues
#         data = {
#             'venues_count': venues_count,
#         }

#         # Serialize the data to return as a response
#         serializer = CountSerializer(data=data)
#         if serializer.is_valid():
#             return Response(serializer.data)  # Return the serialized count data
#         return Response(serializer.errors, status=400)  # Return error if serialization fails


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
        """
        Overrides the default get_queryset method to filter venues
        based on the 'search' query parameter.
        """
        queryset = super().get_queryset()  # Get the initial queryset
        search = self.request.query_params.get('search', None)  # Get the 'search' parameter from the request
        sport = self.request.query_params.get('sports', None)  # Get the 'sport' parameter
        if search:
            # Filter the queryset to match the search term in the venue name or area
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(area__icontains=search)
            )

        # Filter by selected sport if provided
        # Filter by sport if provided
        if sport:
            # Use icontains and add commas before and after to match sports within comma-separated values
            queryset = queryset.filter(sports__icontains=sport)

        return queryset

# View to return counts of venues (and can be extended for other counts)
class CountView(APIView):
    """
    API View to return a count of different entities, such as venues.
    """
    def get(self, request):
        """
        Returns the count of venues.
        """
        venues_count = Venue.objects.count()  # Get the total count of venues
        
        # Simply return the count data as a JSON response, no need for serialization
        data = {
            'venues_count': venues_count
        }

        return Response(data)  # Send the count as a JSON response

# View to retrieve the details of a specific venue by ID
class VenueDetailView(generics.RetrieveAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    lookup_field = 'id'  # This ensures the view looks for the venue by 'id'