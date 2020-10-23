# -*- coding: utf-8 -*-
import os
import errno
try:
    import simplejson as json
except ImportError:
    import json
from common.models import Settings
from django.core.exceptions import ObjectDoesNotExist
from channels.layers import get_channel_layer
import redis
from rest_framework.permissions import DjangoModelPermissions
from permission.models import Permission


class WebsocketAuth(object):

    @property
    def authenticate(self):
        # user auth
        if self.message.user.is_authenticated():
            return True
        else:
            return False

    def haspermission(self, perm):
        # permission auth
        if self.message.user.has_perm(perm):
            return True
        else:
            return False


def get_redis_instance():
    if isinstance(get_channel_layer().pools[0].host["address"], tuple):
        conn = get_channel_layer().pools[0].host["address"]
        return redis.Redis(host=conn[0], port=conn[1], db=0)
    else:
        raise Exception("Unsupported redis type!")


def mkdir_p(path):
    """
    Pythonic version of "mkdir -p".  Example equivalents::

        >>> mkdir_p('/tmp/test/testing') # Does the same thing as...
        >>> from subprocess import call
        >>> call('mkdir -p /tmp/test/testing')

    .. note:: This doesn't actually call any external commands.
    """
    try:
        os.makedirs(path)
    except OSError as exc:
        if exc.errno == errno.EEXIST:
            pass
        else:
            raise  # The original exception


class CustomeFloatEncoder(json.JSONEncoder):
    def encode(self, obj):
        if isinstance(obj, float):
            return format(obj, '.6f')
        return json.JSONEncoder.encode(self, obj)


def get_settings_value(name):
    try:
        data = Settings.objects.get(name=name)
        if data.value == 'True':
            value = True
        else:
            value = False
    except ObjectDoesNotExist:
        value = False
    return value


def set_settings(settings_path, variable: bytes, value: str, boolean=False):
    if not os.path.exists(settings_path):
        with open(settings_path, 'w') as fd:
            pass
    data = []
    with open(settings_path, "rb") as f:
        data = f.readlines()
    data = [i.decode() for i in data]
    has_settings_exist = False
    for i in data:
        if i.startswith(variable.decode() + " = "):
            try:
                data.pop(data.index(i))
            except:
                pass
            if boolean:
                data.append('''{0} = {1}'''.format(variable.decode(), value))
            else:
                data.append('''{0} = "{1}"'''.format(
                    variable.decode(), value))
            has_settings_exist = True
    if not has_settings_exist:
        if boolean:
            data.append('''{0} = {1}'''.format(variable.decode(), value))
        else:
            data.append('''{0} = "{1}"'''.format(variable.decode(), value))
    with open(settings_path, "w") as f:
        for i in data:
            f.write("{0}\n".format(i.decode().strip()
                                   if isinstance(i, bytes) else i.strip()))

from rest_framework_simplejwt.models import TokenUser
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from django.contrib.auth.models import PermissionsMixin


class CustomModelPerm(DjangoModelPermissions):

    perms_map = {
            'GET': ['%(app_label)s.can_view_%(model_name)s'],
            'OPTIONS': [],
            'HEAD': [],
            'POST': ['%(app_label)s.can_add_%(model_name)s'],
            'PUT': ['%(app_label)s.can_change_%(model_name)s'],
            'PATCH': ['%(app_label)s.can_change_%(model_name)s'],
            'DELETE': ['%(app_label)s.can_delete_%(model_name)s'],
        }

    def has_permission(self, request, view):
        # Workaround to ensure DjangoModelPermissions are not applied
        # to the root view when using DefaultRouter.
        # print(88888888888888888888,view.perms_map)
        if hasattr(view,'perms_map'):
            self.perms_map = view.perms_map

        if getattr(view, '_ignore_model_permissions', False):
            return True

        if not request.user or (
           not request.user.is_authenticated and self.authenticated_users_only):
            return False

        if hasattr(view,'get_queryset') or getattr(view,'queryset', None):
            if getattr(view,'queryset', None) is None:
                perms = self.perms_map[request.method] if request.method in self.perms_map else ('None.None')
            else:
                queryset = self._queryset(view)
                perms = self.get_required_permissions(request.method, queryset.model)
            # print(9999999999,queryset.model._meta.permissions)
        else:
            perms = self.perms_map[request.method] if request.method in self.perms_map else ('None.None')
        # print(request.path,request.method)
        # print(88888888,perms)
        # print(request.user.username)
        # print(request.user.__dict__)
        # print(request.user.has_perms)
        # print(request.user.user_permissions)
        # print(191919191,perms,request.user.has_perms(perms))
        if request.user.is_active and request.user.is_superuser:
            return True
        try:
            permobj = Permission.objects.get(user=request.user)
            all_perms = set()
            for perm in permobj.permissions.all():
                # print(6666,perm.codename,perm.content_type.app_label)
                all_perms.add('{0}.{1}'.format(perm.content_type.app_label,perm.codename))
                all_perms.add(perm.codename)
            if len(perms) == 0:
                return False
            for perm in perms:
                if perm not in all_perms:
                    return False
            return True
        except ObjectDoesNotExist:
            # print(9999)
            return False
        # return request.user.has_perms(perms)