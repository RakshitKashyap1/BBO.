from rest_framework.routers import DefaultRouter
from apps.users.views import UserViewSet
from apps.adspaces.views import AdSpaceViewSet
from apps.bookings.views import BookingViewSet
from apps.payments.views import PaymentViewSet
from apps.reports.views import ReportViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'adspaces', AdSpaceViewSet, basename='adspace')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'reports', ReportViewSet, basename='report')

urlpatterns = router.urls
