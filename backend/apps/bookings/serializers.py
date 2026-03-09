from rest_framework import serializers
from .models import Booking

from adspaces.serializers import AdSpaceSerializer

class BookingSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(source='start_date')
    endDate = serializers.DateField(source='end_date')
    totalPrice = serializers.DecimalField(source='total_price', max_digits=12, decimal_places=2, read_only=True)
    adspace_details = AdSpaceSerializer(source='adspace', read_only=True)

    class Meta:
        model = Booking
        fields = ('id', 'advertiser', 'adspace', 'adspace_details', 'startDate', 'endDate', 'totalPrice', 'status')
        read_only_fields = ('advertiser', 'status', 'totalPrice')
