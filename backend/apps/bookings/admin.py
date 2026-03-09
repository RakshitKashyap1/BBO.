from django.contrib import admin
from .models import Campaign, Booking, Creative

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'advertiser', 'start_date', 'end_date', 'budget')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('adspace', 'advertiser', 'start_date', 'end_date', 'status', 'total_price')
    list_filter = ('status', 'start_date')

@admin.register(Creative)
class CreativeAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'format', 'upload_date')
