from __future__ import absolute_import, division, print_function, unicode_literals

import django
from django import forms
from django.contrib.admin.forms import AdminAuthenticationForm
from django.contrib.admin.sites import AdminSite
from django.contrib import admin
from common.models import ServerInfor, ServerGroup, Credential, CommandsSequence, Log, CommandLog, Settings
#from django_otp.forms import OTPAuthenticationFormMixin


class LogAdmin(admin.ModelAdmin):
    list_display = ('user',)


class CredentialInline(admin.TabularInline):
    model = ServerInfor


class CredentialAdmin(admin.ModelAdmin):
    inlines = [CredentialInline]


class LogInline(admin.TabularInline):
    model = Log


class ServerInforAdmin(admin.ModelAdmin):
    inlines = [LogInline]


class SettingsAdmin(admin.ModelAdmin):
    list_display = ("name","value","datetime")

admin.site.register(ServerInfor, ServerInforAdmin)
admin.site.register(ServerGroup)
admin.site.register(Credential, CredentialAdmin)
admin.site.register(CommandsSequence)
admin.site.register(CommandLog)
admin.site.register(Log, LogAdmin)
admin.site.register(Settings,SettingsAdmin)

# class OTPAdminAuthenticationForm(AdminAuthenticationForm, OTPAuthenticationFormMixin):

#otp_device = forms.CharField(required=False, widget=forms.Select)
#otp_token = forms.CharField(required=False)

#otp_challenge = forms.CharField(required=False)

# def __init__(self, *args, **kwargs):
#super(OTPAdminAuthenticationForm, self).__init__(*args, **kwargs)

#minor_django_version = django.VERSION[:2]

# if minor_django_version < (1, 6):
#self.fields['otp_token'].widget.attrs['style'] = 'width: 14em;'

# def clean(self):
#self.cleaned_data = super(OTPAdminAuthenticationForm, self).clean()
# self.clean_otp(self.get_user())

# return self.cleaned_data


# class OTPAdminSite(AdminSite):

#name = 'webterminal'

#login_form = OTPAdminAuthenticationForm

#login_template = '../templates/admin/login.html'

# def __init__(self, name='webterminal'):
#super(OTPAdminSite, self).__init__(name)

# def has_permission(self, request):

# return super(OTPAdminSite, self).has_permission(request) and request.user.is_verified()
