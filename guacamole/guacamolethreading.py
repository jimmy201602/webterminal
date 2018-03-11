# -*- coding: utf-8 -*-
import threading
try:
    import simplejson as json
except ImportError:
    import json

def get_redis_instance():
    from django_guacamole.asgi import channel_layer
    return channel_layer._connection_list[0]
import ast
import logging
logger = logging.getLogger(__name__)
import time

class GuacamoleThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""
    
    def __init__(self,message,client):
        super(GuacamoleThread, self).__init__()
        self._stop_event = threading.Event()
        self.message = message
        self.queue = self.redis_queue()
        self.client = client
        self.read_lock = threading.RLock()
        self.write_lock = threading.RLock()
        self.pending_read_request = threading.Event()        
        
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
        #while (not self._stop_event.is_set()):
            #text = self.queue.get_message()
            #if text:
                #if isinstance(data,(list,tuple)):
                    #if data[0] == 'close':
                        #self.stop()
        from django_guacamole.asgi import channel_layer
        with self.read_lock:
            #self.pending_read_request.clear()

            while True:
                instruction = self.client.receive()
                if instruction:
                    channel_layer.send(self.message.reply_channel.name,{"text":instruction})
                else:
                    break
    
                #if self.pending_read_request.is_set():
                    #logger.info('Letting another request take over.')
                    #break

            # End-of-instruction marker
            channel_layer.send(self.message.reply_channel.name,{"text":'0.;'})


class GuacamoleThreadWrite(GuacamoleThread):
    
    def run(self):
        while True:
            text = self.queue.get_message()
            try:
                data = ast.literal_eval(text['data'])
            except Exception,e:
                if isinstance(text,dict) and text.has_key('data'):
                    data = text['data']
                elif isinstance(text,(unicode,basestring)):
                    data = text
                else:
                    data = text

            if data:
                if isinstance(data,(list,tuple)):
                    if data[0] == 'close':
                        self.stop()
                if isinstance(data,(long,int)) and data == 1:
                    pass
                else:
                    #print 'write',data
                    with self.write_lock:
                        self.client.send(str(data))
            else:
                time.sleep(0.001)