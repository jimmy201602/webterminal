# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import logging
import threading
import uuid

from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render,render_to_response
from django.views.decorators.csrf import csrf_exempt

from guacamole.client import GuacamoleClient
from django.views.generic import View
from django.views.generic.detail import DetailView
from webterminal.settings import MEDIA_URL
from webterminal.models import Log
from common.views import LoginRequiredMixin
from django.contrib.auth.mixins import PermissionRequiredMixin

logger = logging.getLogger(__name__)
sockets = {}
sockets_lock = threading.RLock()
read_lock = threading.RLock()
write_lock = threading.RLock()
pending_read_request = threading.Event()


class Index(LoginRequiredMixin,PermissionRequiredMixin,View):
    permission_required = 'webterminal.can_connect_serverinfo'

    def get(self,request,id):
        return render_to_response('guacamole/index.html',locals())

class LogPlay(LoginRequiredMixin,PermissionRequiredMixin,DetailView):
    model = Log
    template_name = 'guacamole/logplay.html'
    permission_required = 'webterminal.can_play_log'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(LogPlay, self).get_context_data(**kwargs)
        objects = kwargs['object']
        context['logpath'] = '{0}{1}-{2}-{3}/{4}'.format(MEDIA_URL,objects.start_time.year,objects.start_time.month,objects.start_time.day,objects.log)
        return context

@csrf_exempt
def tunnel(request):
    qs = request.META['QUERY_STRING']
    logger.info('tunnel %s', qs)
    if qs == 'connect':
        return _do_connect(request)
    else:
        tokens = qs.split(':')
        if len(tokens) >= 2:
            if tokens[0] == 'read':
                return _do_read(request, tokens[1])
            elif tokens[0] == 'write':
                return _do_write(request, tokens[1])

    return HttpResponse(status=400)


def _do_connect(request):
    # Connect to guacd daemon
    client = GuacamoleClient(settings.GUACD_HOST, settings.GUACD_PORT)
    client.handshake(protocol='rdp',
                     hostname=settings.SSH_HOST,
                     port=settings.SSH_PORT,
                     username=settings.SSH_USER,
                     password=settings.SSH_PASSWORD)
    # security='any',)

    cache_key = str(uuid.uuid4())
    with sockets_lock:
        logger.info('Saving socket with key %s', cache_key)
        sockets[cache_key] = client

    response = HttpResponse(content=cache_key)
    response['Cache-Control'] = 'no-cache'

    return response


def _do_read(request, cache_key):
    pending_read_request.set()

    def content():
        with sockets_lock:
            client = sockets[cache_key]

        with read_lock:
            pending_read_request.clear()

            while True:
                instruction = client.receive()
                if instruction:
                    yield instruction
                else:
                    break

                if pending_read_request.is_set():
                    logger.info('Letting another request take over.')
                    break

            # End-of-instruction marker
            yield '0.;'

    response = StreamingHttpResponse(content(),
                                     content_type='application/octet-stream')
    response['Cache-Control'] = 'no-cache'
    return response


def _do_write(request, cache_key):
    with sockets_lock:
        client = sockets[cache_key]

    with write_lock:
        while True:
            chunk = request.read(8192)
            if chunk:
                client.send(chunk)
            else:
                break

    response = HttpResponse(content_type='application/octet-stream')
    response['Cache-Control'] = 'no-cache'
    return response
