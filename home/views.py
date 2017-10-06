from django.shortcuts import render

# Create your views here.

def works(request):
    context = {'testing':'tested this thing'}
    return render(request, 'home/works.html', context)

def live(request):
    return render(request, 'home/live.html')

def connect(request):
    return render(request, 'home/connect.html')
