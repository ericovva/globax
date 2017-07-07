from django.conf.urls import url

from main import views

urlpatterns = [
    url(r'^about', views.about),
    url(r'^contacts', views.contacts),
    url(r'^service', views.service),
    url(r'^outdoor', views.outdoor),
    url(r'^indoor', views.indoor),
    url(r'^transit', views.transit),
    url(r'^mass_media', views.mass_media),
    url(r'^nonstandard', views.nonstandard),
    url(r'^internet', views.internet),
    url(r'^creative_production', views.creative_production),
    url(r'^bc32571230aa.html', views.accept),
    url(r'^$', views.index, name='index'),
#    url(r'^get_subcategories/([0-9]{1,5})', views.get_subcategories),
]


