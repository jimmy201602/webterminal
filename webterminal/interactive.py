# -*- coding: utf-8 -*-
import socket
from paramiko.py3compat import u
try:
    from django.utils.encoding import smart_unicode
except ImportError:
    from django.utils.encoding import smart_text as smart_unicode
try:
    import termios
except ImportError:
    raise Exception('This project does\'t support windows system!')
try:
    import simplejson as json
except ImportError:
    import json
import time
import threading
import ast
import traceback
from common.utils import get_redis_instance
import struct
import paramiko
import logging
logger = logging.getLogger(__name__)
try:
    unicode
except NameError:
    unicode = str
from six import string_types as basestring
try:
    long
except NameError:
    long = int
import select
import socket
from asgiref.sync import async_to_sync


def interactive_shell(chan, channel, log_name=None, width=90, height=40, elementid=None):
    posix_shell(chan, channel, log_name=log_name,
                width=width, height=height, elementid=elementid)


def posix_shell(chan, channel, log_name=None, width=90, height=40, elementid=None):
    from channels.layers import get_channel_layer
    channel_layer = get_channel_layer()
    try:
        chan.settimeout(0.0)
        data = None
        while True:
            try:
                r, w, x = select.select([chan], [], [])
                if chan in r:
                    data = chan.recv(1024)
                    x = u(data)
                    if x == '<<<close>>>':  # close flag
                        chan.close()
                        logger.debug('close ssh session')
                        break
                    if len(x) == 0:
                        if elementid:
                            async_to_sync(channel_layer.send)(channel,{'text': json.dumps(
                                ['disconnect', smart_unicode('\r\n*** EOF\r\n'), elementid.rsplit('_')[0]]),"type": "webterminal.message"})
                        else:
                            async_to_sync(channel_layer.send)(channel,{'bytes': '\r\n\r\n[Finished...]\r\n',"type": "webterminal.message"})
                        break
                    if len(x) > 0:
                        async_to_sync(channel_layer.send)(channel,{'text': x,"type": "webterminal.message"})
                    if x == "exit\r\n" or x == "logout\r\n" or x == 'logout':
                        chan.close()
            except socket.timeout:
                break
            except UnicodeDecodeError:
                async_to_sync(channel_layer.send)(channel,{'bytes': data,"type": "webterminal.message"})
            except Exception as e:
                logger.error(traceback.print_exc())
                if elementid:
                    async_to_sync(channel_layer.send)(channel,{'text': json.dumps(
                        ['stdout', 'A bug find,You can report it to me' + smart_unicode(e), elementid.rsplit('_')[0]]),"type": "webterminal.message"})
                else:
                    async_to_sync(channel_layer.send)(channel,{'bytes': data,"type": "webterminal.message"})

    finally:
        chan.transport.close()
        # hand ssh terminal exit
        queue = get_redis_instance()
        queue.pubsub()
        queue.publish(channel, json.dumps(['close']))


class SshTerminalThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""

    def __init__(self, message, chan, elementid=None):
        super(SshTerminalThread, self).__init__()
        self._stop_event = threading.Event()
        self.message = message
        self.chan = chan
        self.elementid = elementid
        self.queue = self.redis_queue()

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()

    def redis_queue(self):
        redis_instance = get_redis_instance()
        redis_sub = redis_instance.pubsub()
        if self.elementid:
            redis_sub.subscribe(self.elementid.rsplit('_')[0])
        else:
            redis_sub.subscribe(self.message.reply_channel.name)
        return redis_sub

    def run(self):
        # fix the first login 1 bug
        first_flag = True
        command = list()
        while (not self._stop_event.is_set()):
            text = self.queue.get_message()
            if text:
                # deserialize data
                if isinstance(text['data'], (str, basestring, unicode, bytes)):
                    if isinstance(text['data'], bytes):
                        try:
                            data = ast.literal_eval(
                                text['data'].decode('utf8'))
                        except Exception as e:
                            data = text['data']
                    else:
                        try:
                            data = ast.literal_eval(text['data'])
                        except Exception as e:
                            data = text['data']
                else:
                    data = text['data']
                if isinstance(data, (list, tuple)):
                    if data[0] == 'close' or data[0] == "'close'":
                        logger.debug('close threading')
                        try:
                            self.chan.send('<<<close>>>')  # close flag
                        except OSError:
                            pass
                        time.sleep(3)
                        self.chan.transport.close()
                        self.chan.close()
                        self.stop()
                    elif data[0] == 'set_size':
                        try:
                            self.chan.resize_pty(
                                width=data[3], height=data[4], width_pixels=data[1], height_pixels=data[2])
                        except (TypeError, struct.error, paramiko.SSHException):
                            pass
                    elif data[0] in ['stdin', 'stdout']:
                        self.chan.send(data[1])

                elif isinstance(data, (int, long)):
                    if data == 1 and first_flag:
                        first_flag = False
                    else:
                        if isinstance(data, bytes):
                            self.chan.send(data)
                        else:
                            self.chan.send(str(data))
                else:
                    try:
                        # vi bug need to be fixed
                        if isinstance(data, bytes):
                            self.chan.send(data)
                        else:
                            self.chan.send(str(data))
                    except socket.error:
                        logger.error('close threading error')
                        self.stop()
            # avoid cpu usage always 100%
            time.sleep(0.001)


class InterActiveShellThread(threading.Thread):

    def __init__(self, chan, channel, log_name=None, width=90, height=40, elementid=None):
        super(InterActiveShellThread, self).__init__()
        self.chan = chan
        self.channel = channel
        self.log_name = log_name
        self.width = width
        self.height = height
        self.elementid = elementid

    def run(self):
        interactive_shell(self.chan, self.channel, log_name=self.log_name,
                          width=self.width, height=self.height, elementid=self.elementid)
