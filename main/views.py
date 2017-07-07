from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader, Context

def index(request):
    return render(request, 'main/index.html',{})

def about(request):
    return render(request, 'main/about.html', {})

def contacts(request):
    return render(request, 'main/contacts.html', {})

def service(request):
    return render(request, 'main/service.html', {})

def outdoor(request):
    return render(request, 'main/outdoor.html', {})

def indoor(request):
    return render(request, 'main/indoor.html', {})

def transit(request):
    return render(request, 'main/transit.html', {})

def mass_media(request):
    return render(request, 'main/mass_media.html', {})

def nonstandard(request):
    return render(request, 'main/nonstandard.html', {})

def internet(request):
    return render(request, 'main/internet.html', {})

def creative_production(request):
    return render(request, 'main/creative_production.html', {})

#####
def accept(request):
    return render(request, 'main/bc32571230aa.html', {})

