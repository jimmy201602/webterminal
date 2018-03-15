from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<ip>\w+.\w+.\w+.\w+)/$', views.Index.as_view(), name='guacamole'),
]
