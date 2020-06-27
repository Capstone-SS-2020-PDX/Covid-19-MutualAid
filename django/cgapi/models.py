from django.contrib.auth.models import AbstractBaseUser, User
from django.db import models
from datetime import date
from django.core.validators import RegexValidator

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
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
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
        return self.username

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])

class Posting(models.Model):
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=256, blank=True, null=True)
    count = models.IntegerField(default=1)
    category = models.CharField(max_length=30, blank=True, null=True)
    created_on = models.DateField(default=date.today)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, blank=True, null=True)
    in_community = models.ForeignKey(Community, on_delete=models.CASCADE, blank=True, null=True, related_name='posts')
    item_pic = models.ImageField(upload_to='pimg/', default='')
    request = models.BooleanField(default=True)
    
    # Meta data about DB table
    class Meta:
        # Set table name, default ordering
        db_table = 'posting'
        ordering = ['id']
    
    # What to output when model is printed as a String
    def __str__(self):
        return self.title

