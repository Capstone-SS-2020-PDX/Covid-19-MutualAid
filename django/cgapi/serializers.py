from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Posting, Community, UserProfile, User

class PostingSerializer(serializers.ModelSerializer):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    class Meta:
        model = Posting
        fields = ('id', 'title', 'desc', 'count', 'category', 'created_on', 'owner', 'in_community', 'item_pic', 'request', 'flagged', 'point')

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ('id', 'name', 'created_on', 'members', 'posts', 'home_pic')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'groups', 'is_active', 'date_joined', 'last_login')

class UserProfileSerializer(serializers.ModelSerializer):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'profile_text', 'created_on', 'home', 'member_of', 'phone_number', 'profile_pic', 'saved_postings', 'is_admin')
