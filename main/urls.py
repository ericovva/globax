from django.conf.urls import url 

from main import views

urlpatterns = [ 
    url(r'^$', views.index, name='index'),
#    url(r'^get_subcategories/([0-9]{1,5})', views.get_subcategories),
]
