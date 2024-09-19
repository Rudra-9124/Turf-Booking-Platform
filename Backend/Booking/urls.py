# urls.py
from django.urls import path
from .views import BookingListCreateAPIView

urlpatterns = [
    path('', BookingListCreateAPIView.as_view(), name='create-booking'),
]