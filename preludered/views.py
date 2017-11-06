from django.shortcuts import render


def index(request):
    return render(request, 'preludered/index.html', {'body_class': 'preludered'})


def nav_prelude_red(request):
    return render(request, 'preludered/nav-prelude-red.html')


def nav_libretto(request):
    return render(request, 'preludered/nav-libretto.html')


def nav_notes(request):
    return render(request, 'preludered/nav-notes.html')


def nav_credits(request):
    return render(request, 'preludered/nav-credits.html')


def nav_music_videos(request):
    return render(request, 'preludered/nav-music-videos.html')
