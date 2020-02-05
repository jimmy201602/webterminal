from django.contrib.auth.forms import PasswordResetForm as OldPasswordResetForm
from django import forms
from django.utils.translation import ugettext_lazy as _
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Field
from django.contrib.auth import password_validation

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
            Submit("pass_change", "Change Password", css_class="btn-warning"),
        )