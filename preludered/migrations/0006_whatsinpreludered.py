# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-12 03:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('preludered', '0005_auto_20171113_0313'),
    ]

    operations = [
        migrations.CreateModel(
            name='WhatsinPreludeRed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('image', models.FileField(default=b'', upload_to=b'uploads/')),
                ('title', models.CharField(default=b'', max_length=255)),
            ],
            options={
                'verbose_name': 'Whats in Prelude Red',
                'verbose_name_plural': 'Whats in Prelude Red',
            },
        ),
    ]
