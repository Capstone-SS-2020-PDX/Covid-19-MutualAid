from django.contrib import admin
from .models import Posting, Community, UserProfile


# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Posting)
admin.site.register(Community)
