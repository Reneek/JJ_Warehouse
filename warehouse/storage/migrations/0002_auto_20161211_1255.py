# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-11 04:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shelf',
            name='end',
            field=models.DateField(),
        ),
    ]
