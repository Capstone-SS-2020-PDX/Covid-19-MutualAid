from rest_framework import serializers
from .models import Posting, Community, User

class PostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posting
        fields = ('id', 'title', 'desc', 'count', 'category', 'created_on', 'owner', 'in_community', 'item_pic')

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ('id', 'name', 'created_on', 'members', 'posts', 'home_pic')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_text', 'created_on', 'home', 'member_of', 'phone_number', 'profile_pic')
