from django.db import models

# Create your models here.


class Music(models.Model):
    track_number = models.IntegerField(default=0)
    image = models.FileField(upload_to='public/uploads/', default='')

    class Meta:
        verbose_name = 'Music'
        verbose_name_plural = 'Music'


class Notes(models.Model):
    image = models.FileField(upload_to='public/uploads/', default='')
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'


class Credits(models.Model):
    image = models.FileField(upload_to='public/uploads/', default='')
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Credits'
        verbose_name_plural = 'Credits'


class MusicVideos(models.Model):
    embed = models.CharField(max_length=500)
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Music Video'
        verbose_name_plural = 'Music Videos'
