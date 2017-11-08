from django.contrib import admin

# Register your models here.
from .models import Music, Credits, MusicVideos, Notes




class MusicAdmin(admin.ModelAdmin):
    fields = ['track_number', 'libretto_image']


admin.site.register(Music, MusicAdmin)
admin.site.register(Credits)
admin.site.register(MusicVideos)
admin.site.register(Notes)
