# -*- coding: utf-8 -*-
import socket
import sys
from paramiko.py3compat import u
try:
    from django.utils.encoding import smart_unicode
except ImportError:
    from django.utils.encoding import smart_text as smart_unicode
import os

try:
    import termios
    import tty
    has_termios = True
except ImportError:
    has_termios = False
    raise Exception('This project does\'t support windows system!')
try:
    import simplejson as json
except ImportError:
    import json
import sys
import time
import codecs
import io
import re
import subprocess
from django.contrib.auth.models import User
from django.utils import timezone
from common.models import Log, CommandLog
from webterminal.settings import MEDIA_ROOT
import threading
import ast
import traceback
from common.utils import get_redis_instance, mkdir_p
from webterminal.commandextract import CommandDeal
import struct
import paramiko
import logging
logger = logging.getLogger(__name__)
try:
    unicode
except NameError:
    unicode = str
try:
    basestring
except NameError:
    basestring = str


def interactive_shell(chan, channel, log_name=None, width=90, height=40, elementid=None):
    if has_termios:
        posix_shell(chan, channel, log_name=log_name,
                    width=width, height=height, elementid=elementid)
    else:
        sys.exit(1)


class CustomeFloatEncoder(json.JSONEncoder):
    def encode(self, obj):
        if isinstance(obj, float):
            return format(obj, '.6f')
        return json.JSONEncoder.encode(self, obj)


def posix_shell(chan, channel, log_name=None, width=90, height=40, elementid=None):
    from webterminal.asgi import channel_layer
    stdout = list()
    begin_time = time.time()
    last_write_time = {'last_activity_time': begin_time}
    command = list()
    if elementid:
        logobj = Log.objects.get(channel=elementid)
    else:
        logobj = Log.objects.get(channel=channel)
    vim_flag = False
    vim_data = ''
    try:
        chan.settimeout(0.0)
        data = None
        while True:
            try:
                data = chan.recv(1024)
                x = u(data)
                if len(x) == 0:
                    if elementid:
                        channel_layer.send(channel, {'text': json.dumps(
                            ['disconnect', smart_unicode('\r\n*** EOF\r\n'), elementid.rsplit('_')[0]])})
                    else:
                        # channel_layer.send(channel, {'text': json.dumps(
                            # ['disconnect', smart_unicode('\r\n*** EOF\r\n')])})
                        channel_layer.send(
                            channel, {'bytes': '\r\n\r\n[Finished...]\r\n'})
                    break
                now = time.time()
                delay = now - last_write_time['last_activity_time']
                last_write_time['last_activity_time'] = now
                if x == "exit\r\n" or x == "logout\r\n" or x == 'logout':
                    chan.close()
                else:
                    if vim_flag:
                        vim_data += x
                    #logger.debug('raw data {0}'.format(command))
                    if '\r\n' not in x:
                        command.append(x)
                    else:
                        command_result = CommandDeal().deal_command(''.join(command))
                        if len(command_result) != 0:
                            # vim command record patch
                            logger.debug(
                                'command {0}'.format(command_result))
                            if command_result.strip().startswith('vi') or command_result.strip().startswith('fg'):
                                CommandLog.objects.create(
                                    log=logobj, command=command_result[0:255])
                                vim_flag = True
                            else:
                                if vim_flag:
                                    if re.compile('\[.*@.*\][\$#]').search(vim_data):
                                        vim_flag = False
                                        vim_data = ''
                                else:
                                    CommandLog.objects.create(
                                        log=logobj, command=command_result[0:255])
                        command = list()

                    if isinstance(x, unicode):
                        stdout.append([delay, x])
                    else:
                        stdout.append([delay, codecs.getincrementaldecoder(
                            'UTF-8')('replace').decode(x)])
                if isinstance(x, unicode):
                    if elementid:
                        channel_layer.send(channel, {'text': json.dumps(
                            ['stdout', x, elementid.rsplit('_')[0]])})
                    else:
                        # channel_layer.send(
                            # channel, {'text': json.dumps(['stdout', x])})
                        channel_layer.send(channel, {'bytes': data})
                else:
                    if elementid:
                        channel_layer.send(channel, {'text': json.dumps(
                            ['stdout', smart_unicode(x), elementid.rsplit('_')[0]])})
                    else:
                        # channel_layer.send(
                            # channel, {'text': json.dumps(['stdout', smart_unicode(x)])})
                        channel_layer.send(channel, {'bytes': data})
                # send message to monitor group
                if log_name:
                    channel_layer.send_group(u'monitor-{0}'.format(log_name.rsplit('/')[1]), {
                                             'text': json.dumps(['stdout', smart_unicode(x)])})
            except socket.timeout:
                pass
            except UnicodeDecodeError:
                channel_layer.send(channel, {'bytes': data})
            except Exception as e:
                # print(type(data))
                # print(repr(data))
                logger.error(traceback.print_exc())
                if elementid:
                    channel_layer.send(channel, {'text': json.dumps(
                        ['stdout', 'A bug find,You can report it to me' + smart_unicode(e), elementid.rsplit('_')[0]])})
                else:
                    # channel_layer.send(channel, {'text': json.dumps(
                        # ['stdout', 'A bug find,You can report it to me' + smart_unicode(e)])})
                    channel_layer.send(channel, {'bytes': data})

    finally:
        attrs = {
            "version": 1,
            # int(subprocess.check_output(['tput', 'cols'])),
            "width": width,
            # int(subprocess.check_output(['tput', 'lines'])),
            "height": height,
            "duration": round(time.time() - begin_time, 6),
            "command": os.environ.get('SHELL', None),
            'title': None,
            "env": {
                "TERM": os.environ.get('TERM'),
                "SHELL": os.environ.get('SHELL', 'sh')
            },
            'stdout': list(map(lambda frame: [round(frame[0], 6), frame[1]], stdout))
        }
        mkdir_p(
            '/'.join(os.path.join(MEDIA_ROOT, log_name).rsplit('/')[0:-1]))
        with open(os.path.join(MEDIA_ROOT, log_name), "a") as f:
            f.write(json.dumps(attrs, ensure_ascii=True,
                               cls=CustomeFloatEncoder, indent=2))

        if elementid:
            audit_log = Log.objects.get(
                channel=elementid, log=log_name.rsplit('/')[-1])
        else:
            audit_log = Log.objects.get(
                channel=channel, log=log_name.rsplit('/')[-1])
        audit_log.is_finished = True
        audit_log.end_time = timezone.now()
        audit_log.save()
        # hand ssh terminal exit
        queue = get_redis_instance()
        redis_channel = queue.pubsub()
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
        if self.elementid:
            logobj = Log.objects.get(channel=self.elementid)
        else:
            logobj = Log.objects.get(channel=self.message.reply_channel.name)
        while (not self._stop_event.is_set()):
            text = self.queue.get_message()
            if text:
                # deserialize data
                if isinstance(text['data'], (str, basestring, unicode)):
                    try:
                        data = ast.literal_eval(text['data'])
                    except Exception as e:
                        data = text['data']
                else:
                    data = text['data']
                if isinstance(data, (list, tuple)):
                    if data[0] == 'close':
                        logger.debug('close threading')
                        self.chan.close()
                        self.stop()
                    elif data[0] == 'set_size':
                        try:
                            self.chan.resize_pty(
                                width=data[3], height=data[4], width_pixels=data[1], height_pixels=data[2])
                        except (TypeError, struct.error, paramiko.SSHException):
                            pass
                    elif data[0] in ['stdin', 'stdout']:
                        if '\r' not in str(data[1]):
                            command.append(data[1])
                        else:
                            # fix command record duplicate
                            if len(data) >= 3 and data[2] == 'command':
                                CommandLog.objects.create(
                                    log=logobj, command=data[1].strip('r')[0:255])
                        self.chan.send(data[1])

                elif isinstance(data, (int, long)):
                    if data == 1 and first_flag:
                        first_flag = False
                    else:
                        self.chan.send(str(data))
                else:
                    try:
                        # get user command and block user action in the future
                        if '\r' not in str(data) or '\n' not in str(data):
                            command.append(str(data))
                        else:
                            record_command = CommandDeal().deal_command(''.join(command))
                            if len(record_command) != 0:
                                logger.debug(
                                    'command input {0}'.format(record_command))
                                command = list()
                        # vi bug need to be fixed
                        self.chan.send(str(data))
                    except socket.error:
                        logger.error('close threading error')
                        self.stop()


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
