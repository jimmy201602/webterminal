from django.contrib.auth.forms import PasswordResetForm as OldPasswordResetForm
from django import forms
from django.utils.translation import ugettext_lazy as _
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Field, Div
from django.contrib.auth import password_validation
import pytz
import os
from common.utils import set_settings, get_settings_value
from common.models import Settings
from django.contrib import messages
from django.conf import settings


class FriendlyPasswordResetForm(OldPasswordResetForm):
    error_messages = dict(
        getattr(OldPasswordResetForm, 'error_messages', {}))
    error_messages['unknown'] = _("This email address doesn't have an "
                                  "associated user account. Are you "
                                  "sure you've registered?")

    def clean_email(self):
        """Return an error message if the email address being reset is unknown.

        This is to revert https://code.djangoproject.com/ticket/19758
        The bug #19758 tries not to leak emails through password reset because
        only usernames are unique in Django's default user model.

        django-authtools leaks email addresses through the registration form.
        In the case of django-authtools not warning the user doesn't add any
        security, and worsen user experience.
        """

        email = self.cleaned_data['email']
        results = list(self.get_users(email))

        if not results:
            raise forms.ValidationError(self.error_messages['unknown'])
        return email


class PasswordResetForm(FriendlyPasswordResetForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()

        self.helper.layout = Layout(
            Field("email", placeholder="Enter email", autofocus=""),
            Submit("pass_reset", "Reset Password", css_class="btn-warning"),
        )


class SetPasswordForm(forms.Form):
    """
    A form that lets a user change set their password without entering the old
    password
    """
    error_messages = {
        'password_mismatch': _("The two password fields didn't match."),
    }
    new_password1 = forms.CharField(
        label=_("New password"),
        widget=forms.PasswordInput,
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=_("New password confirmation"),
        strip=False,
        widget=forms.PasswordInput,
    )

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)

    def clean_new_password2(self):
        password1 = self.cleaned_data.get('new_password1')
        password2 = self.cleaned_data.get('new_password2')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError(
                    self.error_messages['password_mismatch'],
                    code='password_mismatch',
                )
        password_validation.validate_password(password2, self.user)
        return password2

    def save(self, commit=True):
        password = self.cleaned_data["new_password1"]
        self.user.set_password(password)
        if commit:
            self.user.save()
        return self.user


class SetPasswordForm(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()

        self.helper.layout = Layout(
            Field("new_password1", placeholder="Enter new password", autofocus=""),
            Field("new_password2", placeholder="Enter new password (again)"),
            Submit("pass_change", "Change Password",
                   css_class="btn-warning"),
        )


class SettingsForm(forms.Form):
    webterminal_detect = forms.BooleanField(label=_(
        "Webterminal Plugin Detect Switch"), required=False)
    otp_switch = forms.BooleanField(
        label=_("Otp Switch"), required=False, help_text=_("Open mfa function or disable it"))
    use_tz = forms.BooleanField(
        label=_("Use TimeZone Time"), required=False, help_text=_("If you set this configuration will affect records datetime on your database!"))
    timezone = forms.CharField(
        label=_("Time Zone"),
        widget=forms.Select(choices=tuple(
            [(tz, tz) for tz in pytz.common_timezones])),
    )

    def set_timezone(self, request):
        timezone = self.cleaned_data["timezone"]
        if getattr(settings, "TIME_ZONE", 'UTC') != timezone:
            settings_path = os.path.join(
                os.path.abspath(os.getcwd()), "extra_settings.py")
            set_settings(settings_path, b"TIME_ZONE", timezone)
            messages.add_message(request, messages.WARNING, _(
                'You just modified the timezone configuration, now you should restart website to apply this change!'))

    def set_use_tz(self, request):
        use_tz = self.cleaned_data["use_tz"]
        if getattr(settings, "USE_TZ", True) != use_tz:
            settings_path = os.path.join(
                os.path.abspath(os.getcwd()), "extra_settings.py")
            set_settings(settings_path, b"USE_TZ", use_tz, boolean=True)
            messages.add_message(request, messages.WARNING, _(
                'You just modified the use time zone time configuration, now you should restart website to apply this change!'))

    def set_otp(self, request):
        otp_switch = self.cleaned_data["otp_switch"]
        if get_settings_value("otp") != otp_switch:
            messages.add_message(request, messages.INFO, _(
                'You just modified the otp configuration!'))
            Settings.objects.update_or_create(
                name="otp", defaults={"value": str(otp_switch)})

    def set_detect_webterminal_plugin(self, request):
        webterminal_detect = self.cleaned_data["webterminal_detect"]
        if get_settings_value("detect_webterminal_helper_is_installed") != webterminal_detect:
            messages.add_message(request, messages.INFO, _(
                'You just modified the detect webterminal helper is installed configuration!'))
            Settings.objects.update_or_create(name="detect_webterminal_helper_is_installed", defaults={
                                              "value": str(webterminal_detect)})

    def set_settings(self, request):
        self.set_timezone(request)
        self.set_otp(request)
        self.set_use_tz(request)
        self.set_detect_webterminal_plugin(request)


class SettingsForm(SettingsForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()

        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-md-2'
        self.helper.field_class = 'col-md-8'
        self.helper.layout = Layout(*[Div(field, css_class='form-group') for field in [
                                    'webterminal_detect', 'otp_switch', 'use_tz', 'timezone']])
