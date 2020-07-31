import logging
import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django_filters import rest_framework as filters
from .models import Posting, Community, UserProfile
from .filters import PostingFilter
from .serializers import PostingSerializer, CommunitySerializer, UserProfileSerializer, UserSerializer
import datetime
        

class PostingViewSet(ModelViewSet):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PostingFilter
    
    @action(detail=False)
    def foo(self, request):
        argument = request.query_params.get('title', '')
        posting = Posting.objects.filter(title__contains=argument)
        serializer = PostingSerializer(posting, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def auth(request):
            posting = Posting.objects.all()
            serializer = PostingSerializer(posting, many=True)
            return Response(serializer.data)
            
    @action(detail=False, methods=['POST'])
    def contact(self, request):
        if request.method == 'POST':
            post_id = request.data.get('postid', '')
            related_post = Posting.objects.get(pk=post_id)
            post_owner = getattr(related_post, 'owner')
            recipient = User.objects.get(pk=post_owner.id).email
            post_title = getattr(related_post, 'title')
            post_desc = getattr(related_post, 'desc')
            sender = request.data.get('addressfrom', '')
            subj = "Common Goods: Reply to post \"%s\"" % (post_title,) 
            message = "Hey there! \n\nSomebody's interested in your post:\nTitle: %s \nDescription: %s \n" % (post_title, post_desc)
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
    
    @action(detail=True)
    def postings(self, request, *args, **kwargs):
        community = self.get_object()
        posting_serializer = PostingSerializer(community.posts, many=True)
        return Response(posting_serializer.data)

class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
        
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True)
    def postings(self, request, *args, **kwargs):
        user = self.get_object()
        posting_serializer = PostingSerializer(user.posts, many=True)
        return Response(posting_serializer.data)
        
        
@api_view(('POST',))
@renderer_classes((JSONRenderer,))
def register_user(request):
    post_data = json.loads(request.body)
    usrpw = post_data.get('password')
    serializer = UserSerializer(data=post_data)
    if serializer.is_valid(raise_exception=True):
        usr = serializer.save()
        usr.set_password(usrpw)
        usr.save()
        profile_data = UserProfile.objects.get(pk=usr.profile.id)
        profile_serializer = UserProfileSerializer(profile_data)
        auth_token = Token.objects.get(user=usr).key
        content = {
            'user': serializer.data,
            'token': auth_token,
            'profile': profile_serializer.data
        }
        return Response(content)
    return Response(data=serializer.errors)   
    
@api_view(('GET',))
def username_available(request):
    argument = request.query_params.get('username', '')
    if User.objects.filter(username=argument).exists():
        return Response(status=409)
    return Response(status=200) 
    
    
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        setattr(user, 'last_login', datetime.datetime.now())
        user.save()
        user_serializer = UserSerializer(user)
        profile_data = UserProfile.objects.get(pk=user.profile.id)
        profile_serializer = UserProfileSerializer(profile_data)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': user_serializer.data,
            'profile': profile_serializer.data
        })
