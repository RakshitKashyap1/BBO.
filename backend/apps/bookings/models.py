from django.db import models
from django.conf import settings
from adspaces.models import AdSpace

class Campaign(models.Model):
    advertiser = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.DecimalField(max_digits=12, decimal_places=2)

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    )
    advertiser = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    adspace = models.ForeignKey(AdSpace, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    @property
    def duration(self):
        return (self.end_date - self.start_date).days

class Creative(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='creatives')
    file_path = models.FileField(upload_to='creatives/')
    format = models.CharField(max_length=50)
    upload_date = models.DateTimeField(auto_now_add=True)
