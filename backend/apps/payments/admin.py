from django.contrib import admin
from .models import Payment, Billing

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('booking', 'amount', 'status', 'payment_date')
    list_filter = ('status',)

@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'booking', 'issue_date', 'total_amount', 'payment_status')
