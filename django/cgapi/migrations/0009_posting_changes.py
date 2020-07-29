# Generated by Django 3.0.6 on 2020-07-18 22:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cgapi', '0008_django_auth_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posting',
            name='email',
        ),
        migrations.AddField(
            model_name='posting',
            name='flagged',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='saved_postings',
            field=models.ManyToManyField(blank=True, to='cgapi.Posting'),
        ),
        migrations.AlterField(
            model_name='posting',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='member_of',
            field=models.ManyToManyField(blank=True, related_name='members', to='cgapi.Community'),
        ),
    ]
