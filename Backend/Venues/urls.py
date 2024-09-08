from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VenueViewSet
from .views import CountView
from .views import VenueDetailView

urlpatterns = [
    path('venue/', VenueViewSet.as_view(), name='venue-list'),
    path('venue/<int:id>/', VenueDetailView.as_view(), name='venue-detail'),
    path('get-counts/', CountView.as_view(), name='get_counts'),
]