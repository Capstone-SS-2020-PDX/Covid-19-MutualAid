# Generated by Django 3.0.6 on 2020-07-29 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cgapi', '0012_rename_home'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posting',
            name='flagged',
            field=models.IntegerField(default=0),
        ),
    ]
