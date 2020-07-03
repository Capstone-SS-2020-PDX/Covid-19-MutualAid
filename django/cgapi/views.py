from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from .models import Posting, Community, UserProfile
from .serializers import PostingSerializer, CommunitySerializer, UserProfileSerializer, UserSerializer
        
        
class PostingViewSet(ModelViewSet):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer
    
    @action(detail=False)
    def foo(self, request):
        argument = request.query_params.get('title', '')
        posting = Posting.objects.filter(title__contains=argument)
        serializer = PostingSerializer(posting, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    def auth(self, request):
        user = get_user(request)
        if user.is_authenticated:
            posting = Posting.objects.all()
            serializer = PostingSerializer(posting, many=True)
            return Response(serializer.data)
        else:
            return Response(status=400)
            
    @action(detail=False, methods=['POST'])
    def contact(self, request):
        if request.method == 'POST':
            post_id = request.data.get('postid', '')
            related_post = Posting.objects.get(pk=post_id)
            recipient = getattr(related_post, 'email')
            post_title = getattr(related_post, 'title')
            post_desc = getattr(related_post, 'desc')
            sender = request.data.get('addressfrom', '')
            subj = "Common Goods test email"
            message = "Hey there! Somebody's interested in your post:\nTitle: %s \nDescription: %s \n" % (post_title, post_desc)
            email = EmailMessage(
                subject=subj,
                body=message,
                to=[recipient],
                reply_to=[sender]
            )
            email.send()
        return Response(request.data)

class CommunityViewSet(ModelViewSet):
    """
    API endpoint allowing Community objects to be created, viewed, edited, deleted
    """
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    @action(detail=False)
    def bar(self, request):
        argument = request.query_params.get('member_of', '')
        user = UserProfile.objects.filter(member_of__id=argument)
        serializer = UserProfileSerializer(userprofile, many=True)
        return Response(serializer.data)
        
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
