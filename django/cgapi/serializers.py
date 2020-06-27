from rest_framework import serializers
from .models import Posting, Community, UserProfile, User

class PostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posting
        fields = ('id', 'title', 'desc', 'count', 'category', 'created_on', 'owner', 'in_community', 'item_pic', 'request')

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ('id', 'name', 'created_on', 'members', 'posts', 'home_pic')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    qs = User.objects.all()
    user = serializers.RelatedField(queryset=qs)
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'profile_text', 'created_on', 'home', 'member_of', 'phone_number', 'profile_pic')
