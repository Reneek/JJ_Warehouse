# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-29 21:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0015_auto_20161230_0500'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='tcost',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transaction',
            name='tsatus',
            field=models.IntegerField(default=1),
        ),
    ]