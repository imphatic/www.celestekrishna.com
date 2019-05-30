from django.conf.urls import url
from . import views

app_name = 'preludered'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nav/prelude-red$', views.nav_prelude_red, name='nav_prelude_red'),
    url(r'^nav/libretto/(?P<track>[0-9]+)$', views.nav_libretto, name='nav_libretto'),
    url(r'^nav/notes$', views.nav_notes, name='nav_notes'),
    url(r'^nav/credits$', views.nav_credits, name='nav_credits'),
    url(r'^nav/music-videos$', views.nav_music_videos, name='nav_music_videos'),
    url(r'^nav/whats$', views.nav_whatsinpreludered, name='nav_whatsinpreludered'),
    url(r'^nav/bts$', views.nav_bts, name='nav_bts'),
    url(r'^nav/whatsinpre$', views.nav_whatsinpre, name='nav_whatsinpre')
]