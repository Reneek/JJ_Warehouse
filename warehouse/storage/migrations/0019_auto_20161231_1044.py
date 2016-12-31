# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-31 02:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0018_category_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=254)),
                ('price', models.IntegerField(default=10)),
            ],
        ),
        migrations.AlterField(
            model_name='transaction',
            name='tcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transaction_category', to='storage.Category2'),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
