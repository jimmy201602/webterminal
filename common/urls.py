from __future__ import absolute_import

from django.conf.urls import url, include
from common.views import (Commands,
                          CommandExecuteList, CommandExecuteDetailApi,
                          CredentialCreate, CredentialList, CredentialDetailApi,
                          ServerCreate, ServerlList, GroupList, GroupCreate,
                          LogList, CommandLogList, WebterminalHelperDetectApi, WebterminalHelperDetectCallbackApi, PasswordResetView,
                          PasswordResetDoneView, PasswordResetConfirmView,
                          SettingsView, SettingsOtpView
                          )
from common.api import ServerGroupViewSet, ServerInforViewSet, CommandsSequenceViewSet, CredentialViewSet, CreateUserViewSet, LogViewSet, CommandsSequenceGroupsViewSet, ServerGroupWithServerInfoViewSet, TimeZoneList, SettingsList,Settings,ServerInforWithCredentialInfoViewSet,DefaultUserSettingsApi,DefaultUserSettingsViewSet,GetDynamicPasswordApi,GetCommandLogListApi,DynamicPasswordAuthApi,WriteGuacamoleLogApi,SshTerminalKillApi,CommandAutoCompeleteApi
from rest_framework import routers
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt

from common.admin import OTPAdminSite
admin.site.__class__ = OTPAdminSite

# Register webterminal api
router = routers.DefaultRouter()
router.register('servergroup', ServerGroupViewSet)
router.register('servergroupwithserverinfo',
                ServerGroupWithServerInfoViewSet)
router.register('serverinfo', ServerInforViewSet)
router.register('serverinfowithcredential', ServerInforWithCredentialInfoViewSet)
router.register('commandssequence', CommandsSequenceViewSet)
router.register('commandssequencegroups', CommandsSequenceGroupsViewSet)
router.register('credential', CredentialViewSet)
router.register('users', CreateUserViewSet)
router.register('logs', LogViewSet)
router.register('defaultusersettings',DefaultUserSettingsViewSet)


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
    url(r'^api/commandsloglistapi/$', GetCommandLogListApi.as_view(), name='commandsloglistapi'),
    url(r'^api/timezonelist/$', TimeZoneList.as_view(), name='timezonelist'),
    url(r'^api/defaultusersettingsquery/$', DefaultUserSettingsApi.as_view(), name='defaultusersettingsquery'),
    url(r'^api/settings/$', Settings.as_view(), name='settings-webterminal'),
    url(r'^api/settingslist/$', SettingsList.as_view(), name='settingslist'),
    url(r'^api/getdynamicpassword/$', GetDynamicPasswordApi.as_view(), name='getdynamicpassword'),
    url(r'^api/dynamicpasswordauth/$', DynamicPasswordAuthApi.as_view(), name='dynamicpasswordauth'),
    url(r'^api/writelog/$', WriteGuacamoleLogApi.as_view(), name='writeguacamolelog'),
    url(r'^api/sshterminalkill/$', SshTerminalKillApi.as_view(), name='sshterminalkill'),
    url(r'^api/commandautocompeleteapi/$', CommandAutoCompeleteApi.as_view(), name='commandautocompeleteapi'),
    url(r'^api/', include(router.urls)),
    url(r'^webterminalhelperdetect/$', csrf_exempt(WebterminalHelperDetectApi.as_view()),
        name='webterminalhelperdetectapi'),
    url(r'^webterminalhelperdetectcallback/$', csrf_exempt(WebterminalHelperDetectCallbackApi.as_view()),
        name='webterminalhelperdetectcallbackapi'),
    url(r"password-reset/$", PasswordResetView.as_view(), name="password-reset"),
    url(
        r"password-reset-done/",
        PasswordResetDoneView.as_view(),
        name="password-reset-done",
    ),
    url(
        r"^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    url(r"settings/$", SettingsView.as_view(), name="settings"),
    url(r"settings-otp/$", SettingsOtpView.as_view(), name="settings-otp"),
]
