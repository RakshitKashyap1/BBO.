from rest_framework import serializers
from .models import Payment, Billing

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['status', 'payment_date']
