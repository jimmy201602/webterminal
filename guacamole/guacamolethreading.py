# -*- coding: utf-8 -*-
import threading
try:
    import simplejson as json
except ImportError:
    import json
import time
import ast
import logging
from socket import timeout
logger = logging.getLogger(__name__)
from django.utils.timezone import now
from webterminal.settings import MEDIA_ROOT
import os
from common.utils import get_redis_instance
try:
    long
except NameError:
    long = int
try:
    unicode
except NameError:
    unicode = str
from six import string_types as basestring


class GuacamoleThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""

    def __init__(self, message, client):
        super(GuacamoleThread, self).__init__()
        self._stop_event = threading.Event()
        self.message = message
        self.queue = self.redis_queue()
        self.client = client
        self.read_lock = threading.RLock()
        self.write_lock = threading.RLock()
        self.pending_read_request = threading.Event()
        directory_date_time = now()
        self.recording_path = os.path.join(MEDIA_ROOT, '{0}-{1}-{2}'.format(
            directory_date_time.year, directory_date_time.month, directory_date_time.day))

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()

    def redis_queue(self):
        redis_instance = get_redis_instance()
        redis_sub = redis_instance.pubsub()
        redis_sub.subscribe(self.message.reply_channel.name)
        return redis_sub

    def run(self):
        from webterminal.asgi import channel_layer
        with self.read_lock:

            while True:
                try:
                    instruction = self.client.receive()
                    if instruction:
                        if instruction.startswith('bytearray(b'):
                            instruction = instruction.rsplit(
                                "bytearray(b'")[1].rsplit("')")[0]
                        channel_layer.send(self.message.reply_channel.name, {
                                           "text": instruction})
                        # with open(os.path.join(self.recording_path,self.message.reply_channel.name),'ab+') as f:
                        # f.write(instruction)
                    else:
                        break
                except timeout:
                    queue = get_redis_instance()
                    queue.pubsub()
                    queue.publish(
                        self.message.reply_channel.name, '10.disconnect;')

            # End-of-instruction marker
            channel_layer.send(
                self.message.reply_channel.name, {"text": '0.;'})


class GuacamoleThreadWrite(GuacamoleThread):

    def run(self):
        while True:
            text = self.queue.get_message()
            try:
                data = ast.literal_eval(text['data'])
            except Exception as e:
                if isinstance(text, dict) and 'data' in text.keys():
                    data = text['data']
                elif isinstance(text, (unicode, basestring)):
                    data = text
                else:
                    data = text

            if data:
                if isinstance(data, (list, tuple)):
                    if data[0] == 'close':
                        self.stop()
                if isinstance(data, (long, int)) and data == 1:
                    pass
                else:
                    # print('write',data)
                    with self.write_lock:
                        self.client.send(data)
                        # with open(os.path.join(self.recording_path,self.message.reply_channel.name),'ab+') as f:
                        # f.write(data)
            else:
                time.sleep(0.001)
