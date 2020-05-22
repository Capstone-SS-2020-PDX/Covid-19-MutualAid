from django.contrib import admin
from .models import Posting, Community, User


# Register your models here.
admin.site.register(User)
admin.site.register(Posting)
admin.site.register(Community)
