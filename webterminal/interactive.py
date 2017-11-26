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
import subprocess

def interactive_shell(chan,channel):
    if has_termios:
        posix_shell(chan,channel)
    else:
        sys.exit(1)
       
class CustomeFloatEncoder(json.JSONEncoder):
    def encode(self, obj):
        if isinstance(obj, float):
            return format(obj, '.6f')
        return json.JSONEncoder.encode(self, obj)

def posix_shell(chan,channel):
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
                    pass
                else:
                    stdout.append([delay,codecs.getincrementaldecoder('UTF-8')('replace').decode(x)]) 
                channel_layer.send(channel, {'text': json.dumps(['stdout',smart_unicode(x)]) })
            except socket.timeout:
                pass
            except Exception,e:
                channel_layer.send(channel, {'text': json.dumps(['stdout','A bug find,You can report it to me' + smart_unicode(e)]) })

    finally:
        attrs = {
            "version": 1,
            "width": 90,#int(subprocess.check_output(['tput', 'cols'])),
            "height": 40,#int(subprocess.check_output(['tput', 'lines'])),
            "duration": round(time.time()- begin_time,6),
            "command": os.environ.get('SHELL',None),
            'title':None,
            "env": {
                "TERM": os.environ.get('TERM'),
                "SHELL": os.environ.get('SHELL','sh')
                },
            'stdout':list(map(lambda frame: [round(frame[0], 6), frame[1]], stdout))
            }
        with open('/tmp/{0}.json'.format(channel.rsplit('.')[2]), "a") as f:
            f.write(json.dumps(attrs, ensure_ascii=False,cls=CustomeFloatEncoder,indent=2))
        pass