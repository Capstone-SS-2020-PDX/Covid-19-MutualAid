import rest_framework as rf
from rest_framework.decorators import action
from .models import Posting, Community, User
from .serializers import PostingSerializer, CommunitySerializer, UserSerializer

from rest_framework import viewsets, permissions


class PostingViewSet(rf.viewsets.ModelViewSet):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer
    
    @action(detail=False)
    def foo(self, request):
        argument = request.query_params.get('title', '')
        posting = Posting.objects.filter(title__contains=argument)
        serializer = PostingSerializer(posting, many=True)
        return rf.response.Response(serializer.data)

class CommunityViewSet(rf.viewsets.ModelViewSet):
    """
    API endpoint allowing Community objects to be created, viewed, edited, deleted
    """
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

class UserViewSet(rf.viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False)
    def bar(self, request):
        argument = request.query_params.get('member_of', '')
        user = User.objects.filter(member_of__id=argument)
        serializer = UserSerializer(user, many=True)
        return rf.response.Response(serializer.data)
