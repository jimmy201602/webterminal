import pytz
from rest_framework import serializers
from common.models import ServerInfor, ServerGroup, Credential, CommandsSequence, Log, DefaultUserSettings
from django.contrib.auth import get_user_model
from common.utils import get_settings_value
from django.conf import settings
import os
from common.utils import set_settings, get_settings_value
from common.models import Settings
UserModel = get_user_model()


class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        fields = '__all__'

    def validate(self, attrs):
        instance = Credential(**attrs)
        instance.clean()
        return attrs


class CredentialProtocolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        fields = ['protocol', 'id', 'username']


class ServerInforSerializer(serializers.ModelSerializer):
    credential = CredentialProtocolSerializer(many=True, read_only=True)

    class Meta:
        model = ServerInfor
        fields = '__all__'


class ServerInforWithCredentialInfoSerializer(serializers.ModelSerializer):
    credentials = CredentialProtocolSerializer(many=True, read_only=True)

    class Meta:
        model = ServerInfor
        fields = '__all__'


class ServerGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServerGroup
        fields = '__all__'


class ServerGroupSerializerWithServerInfo(serializers.ModelSerializer):
    servers = ServerInforSerializer(many=True, read_only=True)

    class Meta:
        model = ServerGroup
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username']


class LogSerializer(serializers.ModelSerializer):
    server = ServerInforSerializer(many=False, read_only=True)
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Log
        fields = '__all__'


class CommandsSequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandsSequence
        fields = '__all__'


class CommandsSequenceGroupsSerializer(serializers.ModelSerializer):
    groups = ServerGroupSerializer(many=True, read_only=False)

    class Meta:
        model = CommandsSequence
        fields = '__all__'


class DefaultUserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultUserSettings
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        """
        Check that the password and verify password is equal.
        """
        if data['password'] != data['password1']:
            raise serializers.ValidationError(
                "password and verify password must be matched!")
        if 'email' in data.keys():
            if UserModel.objects.filter(email=data['email']).count() > 0:
                raise serializers.ValidationError(
                    'Email address must be unique!')
        return data

    def create(self, validated_data):

        user = UserModel.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

    class Meta:
        model = UserModel
        fields = ("id", "username", "password", "email", "password1")


class SettingsSerializer(serializers.Serializer):
    webterminal_detect = serializers.BooleanField(required=False)
    otp_switch = serializers.BooleanField(required=False)
    use_tz = serializers.BooleanField(required=False)
    timezone = serializers.ChoiceField(
        [(tz, tz) for tz in pytz.common_timezones], required=False)

    def set_timezone(self, validated_data):
        timezone = validated_data["timezone"]
        if getattr(settings, "TIME_ZONE", 'UTC') != timezone:
            settings_path = os.path.join(
                os.path.abspath(os.getcwd()), "extra_settings.py")
            set_settings(settings_path, b"TIME_ZONE", timezone)

    def set_use_tz(self, validated_data):
        use_tz = validated_data["use_tz"]
        if getattr(settings, "USE_TZ", True) != use_tz:
            settings_path = os.path.join(
                os.path.abspath(os.getcwd()), "extra_settings.py")
            set_settings(settings_path, b"USE_TZ", use_tz, boolean=True)

    def set_otp(self, validated_data):
        otp_switch = validated_data["otp_switch"]
        if get_settings_value("otp") != otp_switch:
            Settings.objects.update_or_create(
                name="otp", defaults={"value": str(otp_switch)})

    def set_detect_webterminal_plugin(self, validated_data):
        webterminal_detect = validated_data["webterminal_detect"]
        if get_settings_value("detect_webterminal_helper_is_installed") != webterminal_detect:
            Settings.objects.update_or_create(name="detect_webterminal_helper_is_installed", defaults={
                                              "value": str(webterminal_detect)})

    def get_initial(self):
        """
        Returns the initial data to use for forms on this view. To avoid form initial cache.
        """
        initial = super().get_initial()
        initial['webterminal_detect'] = get_settings_value(
            "detect_webterminal_helper_is_installed")
        initial['otp_switch'] = get_settings_value("otp")
        initial['timezone'] = getattr(settings, "TIME_ZONE", 'UTC')
        initial['use_tz'] = getattr(settings, "USE_TZ", True)
        return initial

    def create(self, validated_data):
        if 'timezone' in validated_data.keys():
            self.set_timezone(validated_data)
        if 'otp_switch' in validated_data.keys():
            self.set_otp(validated_data)
        if 'use_tz' in validated_data.keys():
            self.set_use_tz(validated_data)
        if 'webterminal_detect' in validated_data.keys():
            self.set_detect_webterminal_plugin(validated_data)
        return validated_data

    def update(self, instance, validated_data):
        self.set_timezone(validated_data)
        self.set_otp(validated_data)
        self.set_use_tz(validated_data)
        self.set_detect_webterminal_plugin(validated_data)
        return instance
