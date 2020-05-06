from .models import Ask
from .serializers import AskSerializer

from rest_framework import generics

class AskList(generics.ListCreateAPIView):
    """
    View all Asks.
    """
    queryset = Ask.objects.all()
    serializer_class = AskSerializer

class AskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Returns a single Ask and allows updates and deletion of an Ask
    """
    queryset = Ask.objects.all()
    serializer_class = AskSerializer
    lookup_url_kwarg = 'ask_id'
