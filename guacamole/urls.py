from django.conf.urls import url

from guacamole import views

urlpatterns = [
    url(r'^(?P<id>[0-9]+)/$', views.Index.as_view(), name='guacamole'),
    url(r'^logplay/(?P<pk>[0-9]+)/',
        views.LogPlay.as_view(), name='guacamolelogplay'),
    url(r'^guacamolemonitor/(?P<pk>[0-9]+)/',
        views.GuacmoleMonitor.as_view(), name='guacamolemonitor'),
    url(r'^guacamolekill/$', views.GuacamoleKill.as_view(), name='guacamolekill'),
]
