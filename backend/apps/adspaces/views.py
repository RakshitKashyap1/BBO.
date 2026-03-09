from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import AdSpace
from .serializers import AdSpaceSerializer
from core.permissions import IsAdSpaceOwnerOrReadOnly

class AdSpaceViewSet(viewsets.ModelViewSet):
    serializer_class = AdSpaceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdSpaceOwnerOrReadOnly]

    def get_queryset(self):
        queryset = AdSpace.objects.all()
        # Support filtering by owner: ?mine=true
        mine = self.request.query_params.get('mine', None)
        if mine == 'true' and self.request.user.is_authenticated:
            return queryset.filter(owner=self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
