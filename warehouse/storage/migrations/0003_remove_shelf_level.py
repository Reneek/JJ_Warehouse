# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-11 05:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0002_auto_20161211_1255'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shelf',
            name='level',
        ),
    ]
