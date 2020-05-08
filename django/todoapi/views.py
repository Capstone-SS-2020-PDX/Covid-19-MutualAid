from .models import Post
from .serializers import PostSerializer

from rest_framework import viewsets, permissions


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint allowing Ask objects to be created, viewed, edited, deleted
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

