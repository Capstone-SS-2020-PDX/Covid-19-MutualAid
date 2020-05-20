from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from datetime import date
from django.core.validators import RegexValidator

class Community(models.Model):
    """"""
    name = models.CharField(max_length=50)
    created_on = models.DateField(default=date.today)
    
    class Meta:
        db_table = 'community'
        ordering = ['id']
    
    def __str__(self):
        return self.name

class User(AbstractBaseUser):
    username = models.CharField(max_length=160, unique=True)
    profile_text = models.CharField(max_length=160)
    member_of = models.ManyToManyField(Community, related_name='members')
    phone_regex = RegexValidator(regex=r'^+?1?\d{9,15}$')
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    created_on = models.DateField(default=date.today)
    
    class Meta:
        db_table = 'user'
        ordering = ['id']

    def __str__(self):
        return self.username

class Posting(models.Model):
    title = models.CharField(max_length=50)
    created_on = models.DateField(default=date.today)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    
    # Meta data about DB table
    class Meta:
        # Set table name, default ordering
        db_table = 'posting'
        ordering = ['id']
    
    # What to output when model is printed as a String
    def __str__(self):
        return self.title

