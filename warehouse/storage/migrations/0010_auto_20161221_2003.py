# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-21 12:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0009_auto_20161217_1106'),
    ]

    operations = [
        migrations.AddField(
            model_name='warehouse_list',
            name='aisle',
            field=models.IntegerField(default=2),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aisle',
            name='aname',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='warehouse_aisle', to='storage.Warehouse_list'),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='aisle',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='wname',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='storage.Warehouse_list'),
        ),
    ]
