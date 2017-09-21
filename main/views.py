# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader, Context
import smtplib
import json
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger('django')

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

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        post = request.POST
        logger.info(post)
        if 'name' in post and 'phone' in post  and 'path' in post:
            if not 'email' in post:
                post['email'] = ''
            if not 'comment' in post:
                post['comment'] = ''
            if not 'path' in post:
                post['path'] = ''
            sender = 'mail@g-m.ru'
            receivers = ["d.tergevorkov@gmail.com", "a-r-t-1@mail.ru", "ericovva@gmail.com", 'ericovva@yandex.ru']
            name = (u''+post['name']).encode('utf-8')
            comment = (u''+post['comment']).encode('utf-8')
            path = (u''+post['path']).encode('utf-8')
            try:
                message = """From: From {} <{}>
To: Globax Media
Subject: Заявка c сайтa
ФИО: {}
Email: {}
Телефон: {}
Комментарий: {}
Со страницы: {}
                """.format( name, post['email'], name, post['email'],post['phone'], comment, path )
            except Exception as e:
                return HttpResponse(json.dumps({'status': 'error', 'mes': 'Неверныe данные' }), content_type='application/json')
            try:
               #from django.core.mail import send_mail
               #send_mail("Заявка c сайтa", message, sender, receivers)
               server = smtplib.SMTP("localhost")
               #server = smtplib.SMTP("smtp.yandex.ru:465")
               #server.starttls()
               #server.ehlo()
               #server.login("ericovva@g-m.ru", "qwerty7gas")
               server.sendmail(sender, receivers, message)
               server.quit()
               logger.info("Заявка отправлена  от {} ".format(name))
               return HttpResponse(json.dumps({'status': 'ok', 'redir': post['path'] }), content_type='application/json')
            except Exception as e:
               logger.error("Error: unable to send email {}".format(e))

        return HttpResponse(json.dumps({'status': 'error', 'mes': 'Заявка не отправлена.<br> Пожалуйста, свяжитесь с нами по телефону!' }), content_type='application/json')

#####
def accept(request):
    return render(request, 'main/bc32571230aa.html', {})

