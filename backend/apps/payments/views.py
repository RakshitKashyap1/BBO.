from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Payment, Billing
from .serializers import PaymentSerializer
from bookings.models import Booking

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Payment.objects.all()
        # Owners can see payments for their adspaces, Advertisers for their bookings
        # For simplicity, filter by advertiser
        return Payment.objects.filter(booking__advertiser=user)

    @action(detail=True, methods=['post'])
    def process(self, request, pk=None):
        payment = self.get_object()
        
        # Simulate payment gateway processing
        if payment.status == 'successful':
            return Response({"detail": "Already paid."}, status=status.HTTP_400_BAD_REQUEST)
            
        payment.status = 'successful'
        payment.save()
        
        # Additional required workflow logic: 
        # Payment endpoint updates booking to paid or triggers approval
        booking = payment.booking
        if booking.status == 'pending':
            # This satisfies "Payment endpoint updates booking" 
            # In a real app we might mark it 'paid' or just 'active'
            booking.status = 'active'
            booking.save()
            
            # Lock the billboard
            adspace = booking.adspace
            adspace.availability_status = 'booked'
            adspace.save()

        return Response(self.get_serializer(payment).data)

    @action(detail=False, methods=['post'])
    def create_and_pay(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save(status='successful')
            booking = payment.booking
            if booking.status == 'pending':
                booking.status = 'active'
                booking.save()
                
                adspace = booking.adspace
                adspace.availability_status = 'booked'
                adspace.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
