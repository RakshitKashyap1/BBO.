import os
import django
import random
from datetime import timedelta
from django.utils import timezone

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bbo_backend.settings')
django.setup()

from users.models import CustomUser
from adspaces.models import AdSpace
from bookings.models import Booking, Campaign
from django.contrib.auth import get_user_model

User = get_user_model()

def seed_data():
    print("Starting India-Specific Database Seeding...")

    # --- 1. CLEAR EXISTING DATA (Optional, but helps with clean demos) ---
    # Booking.objects.all().delete()
    # Campaign.objects.all().delete()
    # AdSpace.objects.all().delete()
    # User.objects.exclude(is_superuser=True).delete()

    # --- 2. CREATE USERS ---
    
    # Media Owners (3)
    owners_data = [
        {"email": "times@bbo.com", "name": "Times Out of Home", "username": "times_ooh"},
        {"email": "bright@bbo.com", "name": "Bright Outdoor Media", "username": "bright_outdoor"},
        {"email": "global@bbo.com", "name": "Global Advertisers India", "username": "global_adv"}
    ]
    
    owners = []
    for data in owners_data:
        owner, created = User.objects.get_or_create(
            email=data['email'],
            defaults={
                'username': data['username'],
                'name': data['name'],
                'role': 'owner'
            }
        )
        if created:
            owner.set_password('owner123')
            owner.save()
            print(f"Created Media Owner: {data['name']}")
        owners.append(owner)

    # Advertisers (5)
    advertisers_data = [
        {"email": "tata@bbo.com", "name": "TATA Motors Ltd", "username": "tata_motors"},
        {"email": "reliance@bbo.com", "name": "Reliance Retail", "username": "reliance_retail"},
        {"email": "mahindra@bbo.com", "name": "Mahindra & Mahindra", "username": "mahindra_m"},
        {"email": "ola@bbo.com", "name": "Ola Cabs", "username": "ola_cabs"},
        {"email": "zomato@bbo.com", "name": "Zomato India", "username": "zomato_india"}
    ]
    
    advertisers = []
    for data in advertisers_data:
        adv, created = User.objects.get_or_create(
            email=data['email'],
            defaults={
                'username': data['username'],
                'name': data['name'],
                'role': 'advertiser'
            }
        )
        if created:
            adv.set_password('advertiser123')
            adv.save()
            print(f"Created Advertiser: {data['name']}")
        advertisers.append(adv)

    # --- 3. CREATE ADSPACES (18 Real Indian Locations) ---
    ad_spaces_config = [
        # Mumbai
        {"loc": "Marine Drive Promenade", "city": "Mumbai", "type": "Billboard", "price": 15000, "footfall": 50000},
        {"loc": "Bandra-Worli Sea Link Entrance", "city": "Mumbai", "type": "LED Wrap", "price": 25000, "footfall": 80000},
        {"loc": "Juhu Tara Road Junction", "city": "Mumbai", "type": "Hoarding", "price": 12000, "footfall": 35000},
        {"loc": "Andheri Link Road", "city": "Mumbai", "type": "Digital", "price": 18000, "footfall": 60000},
        
        # Delhi
        {"loc": "Connaught Place Inner Circle", "city": "Delhi", "type": "Digital", "price": 20000, "footfall": 75000},
        {"loc": "South Extension Part II", "city": "Delhi", "type": "Hoarding", "price": 14000, "footfall": 40000},
        {"loc": "Nehru Place Main Road", "city": "Delhi", "type": "Unipole", "price": 9000, "footfall": 30000},
        {"loc": "Gurgaon Cyber Hub Entrance", "city": "Delhi NCR", "type": "LED Screen", "price": 22000, "footfall": 55000},
        
        # Bangalore
        {"loc": "MG Road Metro Station", "city": "Bangalore", "type": "Digital Billboard", "price": 16000, "footfall": 65000},
        {"loc": "Koramangala 80 Feet Road", "city": "Bangalore", "type": "Hoarding", "price": 11000, "footfall": 38000},
        {"loc": "Whitefield IT Park Gate", "city": "Bangalore", "type": "Unipole", "price": 13000, "footfall": 45000},
        {"loc": "Indiranagar 100 Feet Road", "city": "Bangalore", "type": "Billboard", "price": 14500, "footfall": 42000},
        
        # Hyderabad
        {"loc": "Banjara Hills Road No 1", "city": "Hyderabad", "type": "Digital", "price": 17000, "footfall": 48000},
        {"loc": "HITEC City Cyber Towers", "city": "Hyderabad", "type": "LED Wrap", "price": 21000, "footfall": 70000},
        {"loc": "Jubilee Hills Check Post", "city": "Hyderabad", "type": "Hoarding", "price": 13500, "footfall": 43000},
        
        # Chennai
        {"loc": "Anna Salai Mount Road", "city": "Chennai", "type": "Billboard", "price": 14000, "footfall": 52000},
        {"loc": "T-Nagar Usman Road", "city": "Chennai", "type": "Hoarding", "price": 10500, "footfall": 60000},
        {"loc": "OMR IT Corridor", "city": "Chennai", "type": "Unipole", "price": 12500, "footfall": 50000},
    ]

    all_adspaces = []
    for i, config in enumerate(ad_spaces_config):
        # Assign owners cyclically
        owner = owners[i % len(owners)]
        
        ad_space, created = AdSpace.objects.get_or_create(
            location=config['loc'],
            city=config['city'],
            defaults={
                'owner': owner,
                'type': config['type'],
                'width': random.choice([20.0, 30.0, 40.0]),
                'height': random.choice([10.0, 15.0, 20.0]),
                'base_price_per_day': config['price'],
                'availability_status': 'available',
                'footfall_estimate': config['footfall']
            }
        )
        if created:
            print(f"Created AdSpace: {config['loc']} ({config['city']})")
        all_adspaces.append(ad_space)

    # --- 4. CREATE CAMPAIGNS & BOOKINGS ---
    print("Creating Sample Bookings...")
    
    today = timezone.now().date()
    
    # Let's create a few campaigns and bookings for each advertiser
    for adv in advertisers:
        # Create a campaign
        campaign_name = f"{adv.name} - Brand Awareness Q1"
        campaign, _ = Campaign.objects.get_or_create(
            advertiser=adv,
            name=campaign_name,
            defaults={
                'start_date': today,
                'end_date': today + timedelta(days=30),
                'budget': random.randint(500000, 2000000)
            }
        )
        
        # Create 2-3 bookings per advertiser
        num_bookings = random.randint(2, 3)
        sample_spaces = random.sample(all_adspaces, num_bookings)
        
        for space in sample_spaces:
            # Check if space is already booked (simplified check for seed)
            start = today + timedelta(days=random.randint(0, 5))
            end = start + timedelta(days=random.randint(7, 14))
            days = (end - start).days
            total = float(space.base_price_per_day) * days
            
            Booking.objects.get_or_create(
                advertiser=adv,
                adspace=space,
                start_date=start,
                end_date=end,
                defaults={
                    'total_price': total,
                    'status': random.choice(['pending', 'active', 'completed'])
                }
            )
            # Update space status if active
            if Booking.objects.filter(adspace=space, status='active').exists():
                space.availability_status = 'booked'
                space.save()

    print("\nSeeding Complete! Enjoy your realistic Indian data.")

if __name__ == '__main__':
    seed_data()
