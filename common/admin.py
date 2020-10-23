from __future__ import absolute_import, division, print_function, unicode_literals

import django
from django import forms
from django.contrib.admin.forms import AdminAuthenticationForm
from django.contrib.admin.sites import AdminSite
from django.contrib import admin
from common.models import ServerInfor, ServerGroup, Credential, CommandsSequence, Log, CommandLog, Settings
from django_otp.forms import OTPAuthenticationFormMixin
from django_otp.plugins.otp_static.models import StaticDevice, StaticToken
from django_otp.plugins.otp_totp.models import TOTPDevice
from common.utils import get_settings_value
from django.core.exceptions import ObjectDoesNotExist
from uuid import uuid4
from django.contrib.auth.models import User
from django.urls import reverse_lazy


class LogAdmin(admin.ModelAdmin):
    list_display = ('user',)


# class CredentialInline(admin.TabularInline):
    # model = ServerInfor


# class CredentialAdmin(admin.ModelAdmin):
    # inlines = [CredentialInline]


class LogInline(admin.TabularInline):
    model = Log


class ServerInforAdmin(admin.ModelAdmin):
    inlines = [LogInline]


class SettingsAdmin(admin.ModelAdmin):
    list_display = ("name", "value", "datetime")


# admin.site.register(ServerInfor, ServerInforAdmin)
# admin.site.register(ServerGroup)
# admin.site.register(Credential, CredentialAdmin)
# admin.site.register(CommandsSequence)
# admin.site.register(CommandLog)
# admin.site.register(Log, LogAdmin)
# admin.site.register(Settings, SettingsAdmin)


class OTPAdminAuthenticationForm(AdminAuthenticationForm, OTPAuthenticationFormMixin):

    otp_device = forms.CharField(required=False, widget=forms.Select)
    otp_token = forms.CharField(required=False)

    otp_challenge = forms.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super(OTPAdminAuthenticationForm, self).__init__(*args, **kwargs)

        minor_django_version = django.VERSION[:2]

        if minor_django_version < (1, 6):
            self.fields['otp_token'].widget.attrs['style'] = 'width: 14em;'

    def clean(self):
        self.cleaned_data = super(OTPAdminAuthenticationForm, self).clean()
        username = self.cleaned_data.get("username", None)
        # if Settings otp open then not fake the auth else fake the auth otp token
        first_login = False
        is_otp_open = get_settings_value("otp")
        if is_otp_open:
            try:
                TOTPDevice .objects.get(
                    user=User.objects.get(username=username))
            except ObjectDoesNotExist:
                first_login = True
        if not is_otp_open or first_login is True:
            static_token = str(uuid4())
            try:
                obj = StaticDevice.objects.get(user=User.objects.get(
                    username=username), name="fake_token")
            except ObjectDoesNotExist:
                obj = StaticDevice.objects.create(
                    user=User.objects.get(username=username), name="fake_token")
                obj.save()
            token_obj = StaticToken.objects.create(
                device=obj, token=static_token)
            token_obj.save()
            self.cleaned_data.update({"otp_token": static_token})
        self.clean_otp(self.get_user())
        if first_login:
            # first login should configuration otp
            self.request.POST._mutable = True
            self.request.POST["next"] = reverse_lazy('settings-otp')
        return self.cleaned_data


class OTPAdminSite(AdminSite):
    name = 'webterminal'

    login_form = OTPAdminAuthenticationForm

    login_template = '../templates/admin/login.html'

    def __init__(self, name='webterminal'):
        super(OTPAdminSite, self).__init__(name)

    def has_permission(self, request):
        return super(OTPAdminSite, self).has_permission(request) and request.user.is_verified()
