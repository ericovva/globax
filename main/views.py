# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader, Context
from django.core.mail import send_mail
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
            sender = 'd-t@g-m.ru'
            receivers = ["d.tergevorkov@gmail.com", "a-r-t-1@mail.ru", "ericovva@gmail.com", 'ericovva@yandex.ru', 'ericovva@g-m.ru']
            name = (u''+post['name']).encode('utf-8')
            comment = (u''+post['comment']).encode('utf-8')
            path = (u''+post['path']).encode('utf-8')
            message = None
            try:
                message = """
<div style="border: 2px green solid; width: 100%; text-align: center; font-size: 23px; ">
    <strong> Клиент оставил заявку </strong>
</div> 
<br> <br>
<div style="font-size: 18px;">
    ФИО: {} <br>
    Email: {} <br>
    Телефон: {} <br>
    Комментарий: {} <br>
    Заявка со страницы: {} <br>
</div>
                """.format( name, post['email'],post['phone'], comment, path )
            except Exception as e:
                return HttpResponse(json.dumps({'status': 'error', 'mes': 'Неверныe данные' }), content_type='application/json')
            try:
               send_mail(
                    'Заявка от клиента {}'.format(name), 
                    '',
                    'notification@g-m.ru',
                    ["d.tergevorkov@gmail.com", "a-r-t-1@mail.ru", "ericovva@gmail.com", 'ericovva@yandex.ru', 'ericovva@g-m.ru', 'dt@g-m.ru'],
                    fail_silently=False, 
                    html_message='<div>{}</div>.'.format(message)
               )
               logger.info("Заявка отправлена  от {} ".format(name))
               return HttpResponse(json.dumps({'status': 'ok', 'redir': post['path'] }), content_type='application/json')
            except Exception as e:
               logger.error("Error: unable to send email {}".format(e))

        return HttpResponse(json.dumps({'status': 'error', 'mes': 'Заявка не отправлена.<br> Пожалуйста, свяжитесь с нами по телефону!' }), content_type='application/json')

#####
def accept(request):
    return render(request, 'main/bc32571230aa.html', {})

