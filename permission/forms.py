from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission as AuthPermission
from permission.models import Permission
from django.contrib.contenttypes.models import ContentType
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout,Div,Field
from django.db import models
from django.forms.widgets import CheckboxSelectMultiple
from django.utils.encoding import force_text
from django.utils.translation import gettext as _

class RegisterForm(forms.Form):

    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-md-2'
        self.helper.field_class = 'col-md-8'
        self.helper.layout = Layout(*[Div(field,css_class='form-group') 
                                      for field in ['user','newpassword1','newpassword2','email'] ])
        super(RegisterForm, self).__init__(*args, **kwargs)

    user = forms.CharField(
            required=True,
            label=u"user name",
            error_messages={'required': _(u'Please input a valid user.')},
            max_length=100,
            widget=forms.TextInput(
                attrs={
                    'class':u"form-control",
                    }
            )
    )
    newpassword1 = forms.CharField(
            required=True,
                label=u"your password",
                error_messages={'required': _(u'Please input your password')},
                widget=forms.PasswordInput(
                attrs={
                    'placeholder':_(u"new password"),
                    'class':u"form-control",
                    }
                )
        )
    newpassword2 = forms.CharField(
            required=True,
            label=_(u"verify your password"),
            error_messages={'required': _(u'please input your  password again')},
            widget=forms.PasswordInput(
                attrs={
                    'placeholder':_(u"verify your password"),
                    'class':u"form-control",
                    }
            )
        )
    email = forms.EmailField(
            required=True,
            label=u"email",
            error_messages={'required': _(u'Please input a valid email address.')},
            widget=forms.EmailInput(
            attrs={
                'class':u"form-control",
                }
            )
        )

    def clean(self):
        if not self.is_valid():
            raise forms.ValidationError({'user':_(u"every filed required")})
        elif self.cleaned_data['newpassword1'] <> self.cleaned_data['newpassword2']:
            raise forms.ValidationError({'newpassword1':_(u"your password does't the same"),'newpassword2':_(u"your password does't the same")})
        elif self.cleaned_data['user']:
            if User.objects.filter(username = unicode(self.cleaned_data['user'])):
                raise forms.ValidationError({'register_code':_(u"User name has been registered!")})
        cleaned_data = super(RegisterForm, self).clean()
        return cleaned_data

class CustomModelMultipleChoiceField(forms.ModelMultipleChoiceField):
        def label_from_instance(self, obj):
            return force_text(_(obj.name))

class PermissionForm(forms.ModelForm):
    permissions = CustomModelMultipleChoiceField(queryset=AuthPermission.objects.\
                                                 filter(content_type__app_label__in=['webterminal','permission'],codename__contains='can_'),\
                                                 widget=forms.CheckboxSelectMultiple())

    def __init__(self, *args, **kwargs):
        super(PermissionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-md-2'
        self.helper.field_class = 'col-md-8'
        self.helper.layout = Layout(*[Div(field,css_class='form-group')
                                      for field in ['user', 'permissions', 'groups'] ])

    class Meta:
        model = Permission
        fields = ['user', 'permissions', 'groups']