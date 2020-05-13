from django.db import models
from datetime import date

class Community(models.Model):
    """"""
    name = models.CharField(max_length=50)
    created_on = models.DateField(default=date.today)
    
    class Meta:
        db_table = 'community'
        ordering = ['id']
    
    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=50)
    created_on = models.DateField(default=date.today)
    profile = models.CharField(max_length=160)
    member_of = models.ManyToManyField(Community, related_name='members')

    class Meta:
        db_table = 'user'
        ordering = ['name']

    def __str__(self):
        return self.name

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
