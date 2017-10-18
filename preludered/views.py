from django.shortcuts import render


def index(request):
    return render(request, 'preludered/index.html')


def player(request):
    return render(request, 'preludered/player.html')
