from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Welcome to the BBO (BillBoard Organiser) API",
        "status": "Running",
        "api_root": "/api/v1/"
    })

urlpatterns = [
    path('', api_root, name='index'),
    path('admin/', admin.site.urls),
    
    # Version 1 API URLs
    path('api/v1/', include('api.urls')),
]
