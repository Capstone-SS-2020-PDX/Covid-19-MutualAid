# Generated by Django 3.0.6 on 2020-07-18 23:10

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cgapi', '0009_posting_changes'),
    ]

    operations = [
        migrations.AddField(
            model_name='posting',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
    ]