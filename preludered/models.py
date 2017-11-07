from django.db import models

# Create your models here.


class Music(models.Model):
    track_number = models.IntegerField(default=0)
    libretto_image = models.CharField(max_length=200)


class Notes(models.Model):
    image = models.CharField(max_length=200)
    order = models.IntegerField(default=0)


class Credits(models.Model):
    image = models.CharField(max_length=200)
    order = models.IntegerField(default=0)


class MusicVideos(models.Model):
    embed = models.CharField(max_length=500)
    order = models.IntegerField(default=0)
