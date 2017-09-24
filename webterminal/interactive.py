import socket
import sys
from paramiko.py3compat import u
from django.utils.encoding import smart_unicode

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

def interactive_shell(chan,channel):
    if has_termios:
        posix_shell(chan,channel)
    else:
        sys.exit(1)


def posix_shell(chan,channel):
    from webterminal.asgi import channel_layer
    try:
        chan.settimeout(0.0)
        while True:
            try:
                x = u(chan.recv(1024))
                if len(x) == 0:
                    channel_layer.send(channel, {'text': json.dumps(['disconnect',smart_unicode('\r\n*** EOF\r\n')]) })
                    break
                channel_layer.send(channel, {'text': json.dumps(['stdout',smart_unicode(x)]) })
            except socket.timeout:
                pass
            except Exception,e:
                channel_layer.send(channel, {'text': json.dumps(['stdout','A bug find,You can report it to me' + smart_unicode(e)]) })

    finally:
        pass