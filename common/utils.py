# -*- coding: utf-8 -*-
import os
import errno
try:
    import simplejson as json
except ImportError:
    import json
from common.models import Settings
from django.core.exceptions import ObjectDoesNotExist


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
    from webterminal.asgi import channel_layer
    return channel_layer._connection_list[0]


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
