from django.db import models
from datetime import date

# Create Ask class to describe the model
class Post(models.Model):
    """Stores a person's 'Ask' (e.g. I need milk)"""
    title = models.CharField(max_length=50)
    created_on = models.DateField(default=date.today)
    
    # Meta data about DB table
    class Meta:
        # Set table name, default ordering
        db_table = 'post'
        ordering = ['id']
    
    # What to output when model is printed as a String
    def __str__(self):
        return self.title