from django.contrib import admin
from .models import AdSpace

@admin.register(AdSpace)
class AdSpaceAdmin(admin.ModelAdmin):
    list_display = ('location', 'city', 'type', 'base_price_per_day', 'availability_status', 'owner')
    list_filter = ('city', 'type', 'availability_status')
    search_fields = ('location', 'city')
