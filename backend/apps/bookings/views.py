from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer

"""
File: apps/bookings/views.py
Description: Handles the lifecycle of billboard bookings, including creation, 
approval by owners, and completion marking.
"""

class BookingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Booking instances.
    Provides standard CRUD operations plus custom actions for workflow management.
    """
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Role-Based Data Filtering:
        - Admins see all bookings in the system.
        - Owners see bookings only for billboards they own.
        - Advertisers see only the bookings they personally made.
        """
        user = self.request.user
        if user.role == 'admin':
            return Booking.objects.all()
        elif user.role == 'owner':
            return Booking.objects.filter(adspace__owner=user)
        return Booking.objects.filter(advertiser=user)

    def perform_create(self, serializer):
        # Role Check: Only Advertisers or Admins can book
        if self.request.user.role not in ['advertiser', 'admin']:
             from rest_framework.exceptions import PermissionDenied
             raise PermissionDenied("Only advertisers can book ad spaces.")
             
        adspace = serializer.validated_data['adspace']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']
        
        # Import local to avoid circular deps and only when needed
        from services.pricing_engine import calculate_price
        
        pricing = calculate_price(adspace, start_date, end_date)
        total_price = pricing["final_price"]
        
        serializer.save(advertiser=self.request.user, total_price=total_price, status='pending')

    @action(detail=True, methods=['put'])
    def approve(self, request, pk=None):
        """
        Transition: Pending -> Active
        Triggered by the billboard owner or admin.
        Locks the billboard availability once approved.
        """
        booking = self.get_object()
        
        # Security: Only privileged roles can authorize a campaign
        if request.user.role not in ['owner', 'admin']:
            return Response({'detail': 'Not authorized to approve bookings'}, status=status.HTTP_403_FORBIDDEN)
            
        if booking.status != 'pending':
            return Response({'detail': 'Only pending bookings can be approved'}, status=status.HTTP_400_BAD_REQUEST)
            
        booking.status = 'active'
        booking.save()
        
        # Mark billboard as 'booked' to prevent double-booking
        adspace = booking.adspace
        adspace.availability_status = 'booked'
        adspace.save()
        
        return Response(self.get_serializer(booking).data)

    @action(detail=True, methods=['put'])
    def complete(self, request, pk=None):
        """
        Transition: Active -> Completed
        Marks the end of a campaign life.
        Frees up the billboard for future bookings.
        """
        booking = self.get_object()
        
        if booking.status != 'active':
            return Response({'detail': 'Only active bookings can be completed'}, status=status.HTTP_400_BAD_REQUEST)
            
        booking.status = 'completed'
        booking.save()
        
        # Re-enable billboard for new searches
        adspace = booking.adspace
        adspace.availability_status = 'available'
        adspace.save()
        
        return Response(self.get_serializer(booking).data)
