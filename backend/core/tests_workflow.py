from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class EndToEndWorkflowTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.advertiser_data = {
            "username": "advertiser_test",
            "email": "adv@test.com",
            "password": "testpassword123",
            "name": "Test Advertiser",
            "role": "advertiser"
        }
        self.owner_data = {
            "username": "owner_test",
            "email": "own@test.com",
            "password": "testpassword123",
            "name": "Test Owner",
            "role": "owner"
        }

    def test_core_workflows(self):
        # 1. User registers
        res = self.client.post('/api/v1/auth/register/', self.advertiser_data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED, "Advertiser registration failed")
        
        res = self.client.post('/api/v1/auth/register/', self.owner_data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED, "Owner registration failed")

        # 2. User logs in (JWT works)
        res = self.client.post('/api/v1/auth/login/', {
            "email": self.advertiser_data["email"],
            "password": self.advertiser_data["password"]
        }, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK, "Advertiser login failed")
        adv_token = res.data['access']

        res = self.client.post('/api/v1/auth/login/', {
            "email": self.owner_data["email"],
            "password": self.owner_data["password"]
        }, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK, "Owner login failed")
        own_token = res.data['access']

        # 3. Create Ad space (as Owner)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + own_token)
        adspace_data = {
            "title": "Test Billboard",
            "description": "A big test billboard",
            "type": "billboard",
            "city": "Test City",
            "location": "Main Street 1",
            "latitude": "10.0",
            "longitude": "20.0",
            "width": "10.00",
            "height": "20.00",
            "basePricePerDay": "100.00",
            "availabilityStatus": "available",
            "footfallEstimate": 5000,
            "isActive": True
        }
        res = self.client.post('/api/v1/adspaces/', adspace_data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED, f"AdSpace creation failed: {res.data}")
        adspace_id = res.data['id']

        # 4. Advertiser searches ad spaces
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + adv_token)
        res = self.client.get('/api/v1/adspaces/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(len(res.data['results']) > 0, "AdSpace search failed")

        # 5. Advertiser books ad space
        booking_data = {
            "adspace": adspace_id,
            "startDate": "2026-04-01",
            "endDate": "2026-04-10"
        }
        res = self.client.post('/api/v1/bookings/', booking_data, format='json')
        print(f"Booking Status: {res.status_code}, Response: {res.data}")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED, f"Booking failed: {res.data}")
        booking_id = res.data['id']
        self.assertIn('totalPrice', res.data, "Dynamic pricing failed to calculate")

        # 6. Owner approves booking
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + own_token)
        res = self.client.put(f'/api/v1/bookings/{booking_id}/approve/', format='json')
        print(f"Approval Status: {res.status_code}, Response: {res.data}")
        self.assertEqual(res.status_code, status.HTTP_200_OK, "Booking approval API failed")
        self.assertEqual(res.data['status'], "active", "Status was not updated to active in the response")

        # 7. Payment endpoint updates booking
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + adv_token)
        payment_data = {
            "booking": booking_id,
            "amount": "1745.00",
            "payment_method": "credit_card"
        }
        res = self.client.post('/api/v1/payments/', payment_data, format='json')
        print(f"Payment Create Status: {res.status_code}, Response: {res.data}")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED, "Payment creation failed")
        payment_id = res.data['id']
        
        # Process the payment
        res = self.client.post(f'/api/v1/payments/{payment_id}/process/', format='json')
        print(f"Payment Process Status: {res.status_code}, Response: {res.data}")
        self.assertEqual(res.status_code, status.HTTP_200_OK, "Payment processing failed")
        
        # 8. Admin views reports
        admin_data = {
            "username": "admin_test",
            "email": "admin@test.com",
            "password": "testpassword123",
            "name": "Test Admin",
            "role": "admin"
        }
        self.client.post('/api/v1/auth/register/', admin_data, format='json')
        res = self.client.post('/api/v1/auth/login/', {"email": "admin@test.com", "password": "testpassword123"}, format='json')
        admin_token = res.data['access']
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + admin_token)
        res = self.client.get('/api/v1/reports/admin/')
        print(f"Admin Report Status: {res.status_code}, Response: {res.data}")
        self.assertEqual(res.status_code, status.HTTP_200_OK, "Admin report viewing failed")
        self.assertIn("total_revenue", res.data)
        
        print("Test workflows completed successfully!")
