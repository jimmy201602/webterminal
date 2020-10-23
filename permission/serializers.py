from rest_framework import serializers
from permission.models import Permission
from common.serializers import ServerGroupSerializer
from django.contrib.auth.models import Permission as AuthPermission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = '__all__'


class AuthPermissionSerializer(serializers.ModelSerializer):
    content_type = ContentTypeSerializer(many=False, read_only=True)

    class Meta:
        model = AuthPermission
        fields = '__all__'


class PermissionWithGroupInfoSerializer(serializers.ModelSerializer):
    groups = ServerGroupSerializer(many=True, read_only=True)
    permissions = AuthPermissionSerializer(many=True, read_only=True)
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Permission
        fields = '__all__'
