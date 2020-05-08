from .models import Ask
from .serializers import AskSerializer

from rest_framework import viewsets, permissions


class AskViewSet(viewsets.ModelViewSet):
    """
    API endpoint allowing Ask objects to be created, viewed, edited, deleted
    """
    queryset = Ask.objects.all()
    serializer_class = AskSerializer

