from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from users.views import RegisterView, UserListView, VerifyOwnerView, MyTokenObtainPairView
from adspaces.views import AdSpaceViewSet
from bookings.views import BookingViewSet

from payments.views import PaymentViewSet
from reports.views import AdminReportView

router = DefaultRouter()
router.register(r'adspaces', AdSpaceViewSet, basename='adspace')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/verify-owner/', VerifyOwnerView.as_view(), name='verify-owner'),
    path('reports/admin/', AdminReportView.as_view(), name='admin-reports'),
    
    path('', include(router.urls)),
]
