from django.db import models
from django.conf import settings

class AdSpace(models.Model):
    """
    AdSpace Model:
    Stores physical dimensions, location data, and pricing baseline 
    for billboards listed by Media Owners.
    """
    STATUS_CHOICES = (
        ('available', 'Available'),
        ('booked', 'Booked'),         # Currently active with an advertiser
        ('maintenance', 'Under Maintenance'),
    )
    
    # Relationships
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='adspaces')
    
    # Location Details
    location = models.CharField(max_length=255) # Specific address or landmark
    city = models.CharField(max_length=100)
    
    # Specifications
    type = models.CharField(max_length=50)      # e.g., 'Digital', 'Static', 'LED Wrap'
    width = models.DecimalField(max_digits=10, decimal_places=2)  # In feet
    height = models.DecimalField(max_digits=10, decimal_places=2) # In feet
    
    # Economics
    base_price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    availability_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    footfall_estimate = models.IntegerField(default=0) # Expected daily views

    def __str__(self):
        """Human-readable representation for admin UI and debugging."""
        return f"{self.type} - {self.location} ({self.city})"
