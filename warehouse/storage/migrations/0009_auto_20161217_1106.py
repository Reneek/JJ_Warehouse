# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-17 03:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0008_category_customer_price_transaction'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='price',
            name='pcategory',
        ),
        migrations.DeleteModel(
            name='Price',
        ),
    ]
