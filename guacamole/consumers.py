# -*- coding: utf-8 -*-
from channels.generic.websockets import WebsocketConsumer
try:
    import simplejson as json
except ImportError:
    import json
import sys
from django.utils.encoding import smart_unicode
from guacamole.guacamolethreading import get_redis_instance
from guacamole.client import GuacamoleClient
import uuid
from django.conf import settings
from guacamole.guacamolethreading import GuacamoleThread,GuacamoleThreadWrite
try:
    import simplejson as json
except ImportError:
    import json
from django.core.exceptions import ObjectDoesNotExist
from webterminal.models import ServerInfor

class GuacamoleWebsocket(WebsocketConsumer):
    
    http_user = True
    #http_user_and_session = True
    channel_session = True
    channel_session_user = True

    
    def connect(self, message,id):
        self.message.reply_channel.send({"accept": True})
        client = GuacamoleClient(settings.GUACD_HOST, settings.GUACD_PORT)
        try:
            data = ServerInfor.objects.get(id=id)
            if data.credential.protocol in ['vnc','rdp','telnet']:
                pass
            else:
                self.message.reply_channel.send({"accept":False})
        except ObjectDoesNotExist:
            #server info not exist
            self.message.reply_channel.send({"accept":False})
        cache_key = str(uuid.uuid4())
        client.handshake(protocol=data.credential.protocol,
                         hostname=data.ip,
                         port=data.credential.port,
                         username=data.credential.username,
                         password=data.credential.password,
                         recording_path='/tmp/{0}'.format(cache_key),
                         recording_name=cache_key,
                         create_recording_path='true',)
                         #enable_wallpaper='true')
                         #security='any',)
        self.message.reply_channel.send({"text":'0.,{0}.{1};'.format(len(cache_key),cache_key)},immediately=True)
       #'0.,36.83940151-b2f9-4743-b5e4-b6eb85a97743;'

        guacamolethread=GuacamoleThread(self.message,client)
        guacamolethread.setDaemon = True
        guacamolethread.start()

        guacamolethreadwrite=GuacamoleThreadWrite(self.message,client)
        guacamolethreadwrite.setDaemon = True
        guacamolethreadwrite.start()
        
    def disconnect(self, message,id):
        #close threading
        print 'disconnect'
        self.message.reply_channel.send({"accept":False})
        #self.closeguacamole()
    
    def queue(self):
        queue = get_redis_instance()
        channel = queue.pubsub()
        return queue
    
    def closeguacamole(self):
        #close threading
        self.queue().publish(self.message.reply_channel.name, json.dumps(['close']))
        
    def receive(self,text=None, bytes=None, **kwargs):
        #print 'receive',text
        #print 'bytes',bytes
        self.queue().publish(self.message.reply_channel.name, text)