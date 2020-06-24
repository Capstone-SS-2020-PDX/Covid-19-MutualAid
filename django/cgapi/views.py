import rest_framework as rf
from rest_framework.decorators import action
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from .models import Posting, Community, UserProfile
from .serializers import PostingSerializer, CommunitySerializer, UserProfileSerializer, UserSerializer
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
    
    @action(detail=False)
    def auth(self, request):
        user = get_user(request)
        if user.is_authenticated:
            posting = Posting.objects.all()
            serializer = PostingSerializer(posting, many=True)
            return rf.response.Response(serializer.data)
        else:
            return rf.response.Response(status=400)

class CommunityViewSet(rf.viewsets.ModelViewSet):
    """
    API endpoint allowing Community objects to be created, viewed, edited, deleted
    """
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

class UserProfileViewSet(rf.viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    @action(detail=False)
    def bar(self, request):
        argument = request.query_params.get('member_of', '')
        user = UserProfile.objects.filter(member_of__id=argument)
        serializer = UserProfileSerializer(userprofile, many=True)
        return rf.response.Response(serializer.data)
        
class UserViewSet(rf.viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
