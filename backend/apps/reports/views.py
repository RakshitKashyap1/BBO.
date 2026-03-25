from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminUser
from bookings.models import Booking
from adspaces.models import AdSpace
from users.models import CustomUser

class AdminReportView(views.APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        total_bookings = Booking.objects.count()
        total_adspaces = AdSpace.objects.count()
        users_count = CustomUser.objects.count()
        
        # We could also aggregate revenue
        from django.db.models import Sum
        revenue = Booking.objects.aggregate(total=Sum('total_price'))['total'] or 0

        return Response({
            "total_bookings": total_bookings,
            "total_adspaces": total_adspaces,
            "total_users": users_count,
            "total_revenue": revenue,
            "status": "success"
        }, status=status.HTTP_200_OK)
