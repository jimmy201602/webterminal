from __future__ import absolute_import

from django.conf.urls import url,include
from common.views import (Commands,CommandExecute,
                          CommandExecuteList,CommandExecuteDetailApi,
                          CredentialCreate,CredentialList,CredentialDetailApi,
                          ServerCreate,ServerlList,GroupList,GroupCreate,
                          LogList)

urlpatterns = [
        url(r'^commands/add/$',Commands.as_view(),name='commandscreate'),
        url(r'^commandexecute/$',CommandExecute.as_view(),name='commandexecute'),
        url(r'^commandslist/$',CommandExecuteList.as_view(),name='commandslist'),
        url(r'^commandsapi/$',CommandExecuteDetailApi.as_view(),name='commandsapi'),
        url(r'^credentialcreate/$',CredentialCreate.as_view(),name='credentialcreate'),
        url(r'^credentiallist/$',CredentialList.as_view(),name='credentiallist'),
        url(r'^credentialdetailapi/$',CredentialDetailApi.as_view(),name='credentialdetailapi'),
        url(r'^servercreate/$',ServerCreate.as_view(),name='servercreate'),
        url(r'^serverlist/$',ServerlList.as_view(),name='serverlist'),
        url(r'^groupcreate/$',GroupCreate.as_view(),name='groupcreate'),
        url(r'^grouplist/$',GroupList.as_view(),name='grouplist'),
        url(r'^logslist/$',LogList.as_view(),name='logslist'),    
]
