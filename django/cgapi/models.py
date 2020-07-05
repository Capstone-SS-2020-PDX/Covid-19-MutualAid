from django.contrib.auth.models import User
from django.db import models
from datetime import date
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Community(models.Model):
    """"""
    name = models.CharField(max_length=50)
    created_on = models.DateField(default=date.today)
    home_pic = models.ImageField(upload_to='cimg/', default='')    
    class Meta:
        db_table = 'community'
        ordering = ['id']
    
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name='profile')
    profile_text = models.CharField(max_length=160)
    member_of = models.ManyToManyField(Community, related_name='members')
    home = models.ForeignKey(Community, on_delete=models.CASCADE, blank=True, null=True)
    phone_number = models.CharField(max_length=17, blank=True)
    created_on = models.DateField(default=date.today)
    profile_pic = models.ImageField(upload_to='uimg/', default='')
    
    class Meta:
        db_table = 'userprofile'
        ordering = ['id']

    def __str__(self):
        return self.user.username

class Posting(models.Model):
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=256, blank=True, null=True)
    count = models.IntegerField(default=1)
    category = models.CharField(max_length=30, blank=True, null=True)
    created_on = models.DateField(default=date.today)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    in_community = models.ForeignKey(Community, on_delete=models.CASCADE, blank=True, null=True, related_name='posts')
    item_pic = models.ImageField(upload_to='pimg/', default='')
    request = models.BooleanField(default=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    
    # Meta data about DB table
    class Meta:
        # Set table name, default ordering
        db_table = 'posting'
        ordering = ['id']
    
    # What to output when model is printed as a String
    def __str__(self):
        return self.title

