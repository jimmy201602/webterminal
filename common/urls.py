from __future__ import absolute_import

from django.conf.urls import url, include
from common.views import (Commands,
                          CommandExecuteList, CommandExecuteDetailApi,
                          CredentialCreate, CredentialList, CredentialDetailApi,
                          ServerCreate, ServerlList, GroupList, GroupCreate,
                          LogList, CommandLogList)
from common.api import ServerGroupViewSet, ServerInforViewSet, CommandsSequenceViewSet, CredentialViewSet
from rest_framework import routers
from django.contrib import admin

#from common.admin import OTPAdminSite
#admin.site.__class__ = OTPAdminSite

# Register webterminal api
router = routers.DefaultRouter()
router.register('servergroup', ServerGroupViewSet)
router.register('serverinfo', ServerInforViewSet)
router.register('commandssequence', CommandsSequenceViewSet)
router.register('credential', CredentialViewSet)

urlpatterns = [
    url(r'^commands/add/$', Commands.as_view(), name='commandscreate'),
    url(r'^commandslist/$', CommandExecuteList.as_view(), name='commandslist'),
    url(r'^commandsapi/$', CommandExecuteDetailApi.as_view(), name='commandsapi'),
    url(r'^credentialcreate/$', CredentialCreate.as_view(),
        name='credentialcreate'),
    url(r'^credentiallist/$', CredentialList.as_view(), name='credentiallist'),
    url(r'^credentialdetailapi/$', CredentialDetailApi.as_view(),
        name='credentialdetailapi'),
    url(r'^servercreate/$', ServerCreate.as_view(), name='servercreate'),
    url(r'^serverlist/$', ServerlList.as_view(), name='serverlist'),
    url(r'^groupcreate/$', GroupCreate.as_view(), name='groupcreate'),
    url(r'^grouplist/$', GroupList.as_view(), name='grouplist'),
    url(r'^logslist/$', LogList.as_view(), name='logslist'),
    url(r'^commandsloglist/$', CommandLogList.as_view(), name='commandsloglist'),
    url(r'^api/', include(router.urls)),
]
