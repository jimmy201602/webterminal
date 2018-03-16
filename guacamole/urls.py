from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<id>[0-9]+)/$', views.Index.as_view(), name='guacamole'),
]
