from rest_framework import serializers
from .models import Posting, Community, User

class PostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posting
        fields = ('id', 'title', 'desc', 'count', 'category', 'created_on', 'owner', 'in_community')

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ('id', 'name', 'created_on', 'members')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_text', 'created_on', 'home', 'member_of', 'phone_number')
