# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-11 05:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0005_remove_shelf_sname'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Shelf',
        ),
    ]
