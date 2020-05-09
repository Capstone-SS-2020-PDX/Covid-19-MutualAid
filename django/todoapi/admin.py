from django.contrib import admin
from .models import Post, Community, User

# Register your models here.

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Community)
