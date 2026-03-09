from rest_framework import serializers
from .models import AdSpace

class AdSpaceSerializer(serializers.ModelSerializer):
    basePricePerDay = serializers.DecimalField(source='base_price_per_day', max_digits=10, decimal_places=2)
    availabilityStatus = serializers.CharField(source='availability_status')
    footfallEstimate = serializers.IntegerField(source='footfall_estimate')
    
    class Meta:
        model = AdSpace
        fields = (
            'id', 'owner', 'location', 'city', 'type', 'width', 'height', 
            'basePricePerDay', 'availabilityStatus', 'footfallEstimate'
        )
        read_only_fields = ('owner',)
