from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions, serializers
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from common.utils import get_settings_value


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_otp_token': _('no otp token'),
        'error_otp_token': _('error otop token'),
        'no_active_account': _('No active account found with the given credentials')
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['otp_token'] = serializers.CharField(
            required=False, max_length=6, allow_blank=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        is_otp_open = get_settings_value("otp")
        if is_otp_open:
            try:
                obj = TOTPDevice.objects.get(user__username=dict(attrs).get('username'))
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
            except ObjectDoesNotExist:
                # in the future will redirect the otp settings page
                pass
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


class WebterminalTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
