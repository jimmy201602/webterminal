from django import forms
from django.contrib.auth.models import User

class register_form(forms.Form):
    user = forms.CharField(
            required=True,
                label=u"user name",
                error_messages={'required': u'Please input a valid user.'},
                max_length=100,
        ) 
    newpassword1 = forms.CharField(
            required=True,
                label=u"your password",
                error_messages={'required': u'Please input your password'},
                widget=forms.PasswordInput(
                    attrs={
                            'placeholder':u"new password",
                                'class':u"form-control m-b",
                        }
                        ),
        )
    newpassword2 = forms.CharField(
            required=True,
                label=u"verify your password",
                error_messages={'required': u'please input your  password again'},
                widget=forms.PasswordInput(
                    attrs={
                            'placeholder':u"verify your password",
                                'class':u"form-control m-b",
                        }
                        ),
        )
    email = forms.EmailField(
            required=True,
                label=u"email",
                error_messages={'required': u'Please input a valid email address.'},
        )

    def clean(self):
        if not self.is_valid():
            raise forms.ValidationError({'user':u"every failed required"})
        elif self.cleaned_data['newpassword1'] <> self.cleaned_data['newpassword2']:
            raise forms.ValidationError({'newpassword1':u"your password does't the same",'newpassword2':u"your password does't the same"})
        elif self.cleaned_data['register_code']:
            raise forms.ValidationError({'register_code':u"Invalid register code."})
        elif self.cleaned_data['user']:
            if User.objects.filter(username = unicode(self.cleaned_data['user'])):
                raise forms.ValidationError({'register_code':u"User name has been registered!"})
        cleaned_data = super(register_form, self).clean()
        return cleaned_data