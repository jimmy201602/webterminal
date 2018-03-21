# -*- coding: utf-8 -*-
import socket
import sys
from paramiko.py3compat import u
from django.utils.encoding import smart_unicode
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
import errno
import subprocess
from django.contrib.auth.models import User 
from django.utils import timezone
from webterminal.models import Log
from webterminal.settings import MEDIA_ROOT
import threading
import ast
import traceback

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
            raise # The original exception
        
def interactive_shell(chan,channel,log_name=None,width=90,height=40):
    if has_termios:
        posix_shell(chan,channel,log_name=log_name,width=width,height=height)
    else:
        sys.exit(1)
       
class CustomeFloatEncoder(json.JSONEncoder):
    def encode(self, obj):
        if isinstance(obj, float):
            return format(obj, '.6f')
        return json.JSONEncoder.encode(self, obj)

def posix_shell(chan,channel,log_name=None,width=90,height=40):
    from webterminal.asgi import channel_layer
    stdout = list()
    begin_time = time.time()
    last_write_time = {'last_activity_time':begin_time}    
    try:
        chan.settimeout(0.0)
        while True:
            try:               
                x = u(chan.recv(1024))
                if len(x) == 0:
                    channel_layer.send(channel, {'text': json.dumps(['disconnect',smart_unicode('\r\n*** EOF\r\n')]) })
                    break             
                now = time.time()
                delay = now - last_write_time['last_activity_time']
                last_write_time['last_activity_time'] = now                
                if x == "exit\r\n" or x == "logout\r\n" or x == 'logout':
                    chan.close()
                else:
                    if isinstance(x,unicode):
                        stdout.append([delay,x])
                    else:
                        stdout.append([delay,codecs.getincrementaldecoder('UTF-8')('replace').decode(x)])
                if isinstance(x,unicode):
                    channel_layer.send(channel, {'text': json.dumps(['stdout',x]) })
                else:
                    channel_layer.send(channel, {'text': json.dumps(['stdout',smart_unicode(x)]) })
                #send message to monitor group
                if log_name:
                    channel_layer.send_group(u'monitor-{0}'.format(log_name.rsplit('/')[1].rsplit('.json')[0]), {'text': json.dumps(['stdout',smart_unicode(x)]) })
            except socket.timeout:
                pass
            except Exception,e:
                print traceback.print_exc()
                channel_layer.send(channel, {'text': json.dumps(['stdout','A bug find,You can report it to me' + smart_unicode(e)]) })

    finally:
        attrs = {
            "version": 1,
            "width": width,#int(subprocess.check_output(['tput', 'cols'])),
            "height": height,#int(subprocess.check_output(['tput', 'lines'])),
            "duration": round(time.time()- begin_time,6),
            "command": os.environ.get('SHELL',None),
            'title':None,
            "env": {
                "TERM": os.environ.get('TERM'),
                "SHELL": os.environ.get('SHELL','sh')
                },
            'stdout':list(map(lambda frame: [round(frame[0], 6), frame[1]], stdout))
            }
        mkdir_p('/'.join(os.path.join(MEDIA_ROOT,log_name).rsplit('/')[0:-1]))
        with open(os.path.join(MEDIA_ROOT,log_name), "a") as f:
            f.write(json.dumps(attrs, ensure_ascii=True,cls=CustomeFloatEncoder,indent=2))
        
        audit_log=Log.objects.get(channel=channel,log=log_name.rsplit('/')[-1].rsplit('.json')[0])
        audit_log.is_finished = True
        audit_log.end_time = timezone.now()
        audit_log.save()
        #hand ssh terminal exit
        queue = get_redis_instance()
        redis_channel = queue.pubsub()
        queue.publish(channel, json.dumps(['close']))

class SshTerminalThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""
    
    def __init__(self,message,chan):
        super(SshTerminalThread, self).__init__()
        self._stop_event = threading.Event()
        self.message = message
        self.queue = self.redis_queue()
        self.chan = chan
        
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
        #fix the first login 1 bug
        first_flag = True
        while (not self._stop_event.is_set()):
            text = self.queue.get_message()
            if text:
                #deserialize data
                if isinstance(text['data'],(str,basestring,unicode)):
                    try:
                        data = ast.literal_eval(text['data'])
                    except Exception,e:
                        data = text['data']
                else:
                    data = text['data']
                
                if isinstance(data,(list,tuple)):
                    if data[0] == 'close':
                        print 'close threading'
                        self.chan.close()
                        self.stop()
                    elif data[0] == 'set_size':
                        self.chan.resize_pty(width=data[3], height=data[4])
                        break
                    elif data[0] in ['stdin','stdout']:
                        self.chan.send(data[1])
                        
                elif isinstance(data,(int,long)):
                    if data == 1 and first_flag:
                        first_flag = False
                    else:
                        self.chan.send(str(data))
                else:
                    try:
                        self.chan.send(str(data))
                    except socket.error:
                        print 'close threading error'
                        self.stop()

class InterActiveShellThread(threading.Thread):
    
    def __init__(self,chan,channel,log_name=None,width=90,height=40):
        super(InterActiveShellThread, self).__init__()
        self.chan = chan
        self.channel = channel
        self.log_name = log_name
        self.width = width
        self.height = height
    
    def run(self):
        interactive_shell(self.chan, self.channel,log_name=self.log_name,width=self.width,height=self.height)
        