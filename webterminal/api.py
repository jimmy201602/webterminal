from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions, serializers
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from common.utils import get_settings_value
from django.contrib.auth.models import User
import uuid
from webterminal.encrypt import PyCrypt
from common.utils import get_redis_instance
import json


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_otp_token': _('no otp token'),
        'error_otp_token': _('error otop token'),
        'no_active_account': _('No active account found with the given credentials')
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['otp_token'] = serializers.CharField(
            required=False, max_length=6, allow_blank=True, allow_null=True)
        self.fields['remember_me'] = serializers.BooleanField(default=False)
        self.fields['remember_me_token'] = serializers.CharField(
            required=False, max_length=256, allow_blank=True, allow_null=True)

    def validate(self, attrs):
        redis_conn = get_redis_instance()
        if dict(attrs).get('remember_me') and dict(attrs).get('remember_me_token'):
            try:
                encrypt = PyCrypt(dict(attrs).get('remember_me_token'))
                content = json.loads(encrypt.decrypt(
                    redis_conn.get(dict(attrs).get('remember_me_token'))))
                if content.get('ip', None) != self.get_request_ip():
                    raise exceptions.AuthenticationFailed(
                        self.error_messages['no_active_account'],
                        'no_active_account',
                    )
                attrs.update({'password': encrypt.decrypt(
                    content.get('password', None))})
            except:
                raise exceptions.AuthenticationFailed(
                    self.error_messages['no_active_account'],
                    'no_active_account',
                )
        data = super().validate(attrs)
        is_otp_open = get_settings_value("otp")
        data['username'] = dict(attrs).get('username')
        if is_otp_open:
            try:
                obj = TOTPDevice.objects.get(
                    user__username=dict(attrs).get('username'))
                if obj.confirmed:
                    # device is ready to use
                    if dict(attrs).get('otp_token') == "":
                        raise exceptions.AuthenticationFailed(
                            self.error_messages['no_otp_token'],
                            'no_otp_token',
                        )
                    else:
                        validated = obj.verify_token(
                            dict(attrs).get('otp_token'))
                        if not validated:
                            raise exceptions.AuthenticationFailed(
                                self.error_messages['error_otp_token'],
                                'error_otp_token',
                            )
                else:
                    # redirect the otp mfa settings page
                    data['detail'] = _('redirect otp settings page')
            except ObjectDoesNotExist:
                # in the future will redirect the otp settings page
                obj = TOTPDevice.objects.create(
                    user=User.objects.get(username=dict(attrs).get('username')), confirmed=False, name='webterminal')
                data['detail'] = _('redirect otp settings page')
        if dict(attrs).get('remember_me'):
            data['remember_me_token'] = uuid.uuid4().hex
            encrypt = PyCrypt(data['remember_me_token'])
            redis_conn.set(data['remember_me_token'], encrypt.encrypt(json.dumps(
                {'ip': self.get_request_ip(), 'username': data['username'], 'password': encrypt.encrypt(dict(attrs).get('password')).decode(), 'remember_me_token': data['remember_me_token']})))
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['is_active'] = user.is_active
        token['id'] = user.id
        token["is_superuser"] = user.is_superuser
        return token

    def get_request_ip(self):
        request = self.context['request']
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class WebterminalTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
