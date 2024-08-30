from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VenueViewSet
from .views import CountView

router = DefaultRouter()
router.register(r'venue', VenueViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get-counts/', CountView.as_view(), name='get_counts'),
]