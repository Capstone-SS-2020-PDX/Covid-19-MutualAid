import rest_framework as rf
from rest_framework.decorators import action
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import Posting, Community, UserProfile
from .serializers import PostingSerializer, CommunitySerializer, UserProfileSerializer, UserSerializer
        
        
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
            
    @action(detail=True, methods=['GET'])
    def contact(self, request):
        if request.method == 'GET':
            user_id = request.query_params.get('userid', '')
            send_to = request.query_params.get('addressto', '')
            reply_to = request.query_params.get('addressfrom', '')
            subject = "Common Goods test email"
            message = "Here's an email from Common Goods, about user %s!" % user_id
            send_mail(
                subject,
                message,
                reply_to,
                [send_to]
            )

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
