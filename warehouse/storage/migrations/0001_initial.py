# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-11 03:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Aisle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shelf', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Shelf',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField()),
                ('start', models.DateField()),
                ('end', models.DateTimeField()),
                ('status', models.IntegerField()),
                ('sname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='aisle_shelf', to='storage.Aisle')),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aisle', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse_list',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=5)),
                ('district', models.CharField(max_length=10)),
                ('street', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='warehouse',
            name='wname',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storage.Warehouse_list'),
        ),
        migrations.AddField(
            model_name='aisle',
            name='aname',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='warehouse_aisle', to='storage.Warehouse'),
        ),
    ]
