import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bbo_backend.settings')
django.setup()

from users.models import CustomUser
from adspaces.models import AdSpace
from django.contrib.auth import get_user_model

User = get_user_model()

def seed_data():
    print("Starting database seeding...")

    # 1. Create Users
    # Admin
    admin_user, created = User.objects.get_or_create(
        email='admin@bbo.com',
        defaults={
            'username': 'admin',
            'name': 'System Admin',
            'role': 'admin',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Created Admin user")

    # Owner
    owner_user, created = User.objects.get_or_create(
        email='owner@bbo.com',
        defaults={
            'username': 'owner',
            'name': 'Media Owner User',
            'role': 'owner'
        }
    )
    if created:
        owner_user.set_password('owner123')
        owner_user.save()
        print("Created Owner user")

    # Advertiser
    advertiser_user, created = User.objects.get_or_create(
        email='advertiser@bbo.com',
        defaults={
            'username': 'advertiser',
            'name': 'Advertiser User',
            'role': 'advertiser'
        }
    )
    if created:
        advertiser_user.set_password('advertiser123')
        advertiser_user.save()
        print("Created Advertiser user")

    # 2. Create AdSpaces
    ad_spaces_data = [
        {
            'location': 'Alkapuri Billboard',
            'city': 'Vadodara',
            'type': 'Billboard',
            'width': 20.0,
            'height': 10.0,
            'base_price_per_day': 5000.0,
            'availability_status': 'available',
            'footfall_estimate': 15000
        },
        {
            'location': 'SayajiGanj Hoarding',
            'city': 'Vadodara',
            'type': 'Hoarding',
            'width': 15.0,
            'height': 12.0,
            'base_price_per_day': 7000.0,
            'availability_status': 'available',
            'footfall_estimate': 25000
        },
        {
            'location': 'Race Course Road',
            'city': 'Vadodara',
            'type': 'Unipole',
            'width': 10.0,
            'height': 10.0,
            'base_price_per_day': 4000.0,
            'availability_status': 'available',
            'footfall_estimate': 10000
        }
    ]

    for data in ad_spaces_data:
        ad_space, created = AdSpace.objects.get_or_create(
            location=data['location'],
            city=data['city'],
            defaults={
                'owner': owner_user,
                'type': data['type'],
                'width': data['width'],
                'height': data['height'],
                'base_price_per_day': data['base_price_per_day'],
                'availability_status': data['availability_status'],
                'footfall_estimate': data['footfall_estimate']
            }
        )
        if created:
            print(f"Created AdSpace: {data['location']}")

    print("Seeding completed successfully!")

if __name__ == '__main__':
    seed_data()
