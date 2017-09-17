import paramiko
import socket
from channels.generic.websockets import WebsocketConsumer
try:
    import simplejson as json
except ImportError:
    import json
from interactive import interactive_shell
import sys
from django.utils.encoding import smart_unicode
global multiple_chan
multiple_chan = dict()

ip='192.168.2.1'
port=22
username='root'
password='pass'

class webterminal(WebsocketConsumer):
    ssh = paramiko.SSHClient() 
    def connect(self, message):
        message.reply_channel.send({"accept": True})
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        try:
            self.ssh.connect(ip, port=port, username=username, password=password,timeout=3)
        except socket.timeout:
            message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server time out\033[0m'])})
            message.reply_channel.send({"accept":False})
            return
        except Exception:
            message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mCan not connect to server\033[0m'])})
            message.reply_channel.send({"accept":False})
            return
        
        chan = self.ssh.invoke_shell(width=120, height=40,)
        multiple_chan[message.reply_channel.name] = chan
        interactive_shell(chan,message.reply_channel.name)
        

    def disconnect(self, message):
        self.message.reply_channel.send({"accept":False})
        if multiple_chan.has_key(self.message.reply_channel.name):
            multiple_chan[self.message.reply_channel.name].close()
        self.close()
    
    def receive(self,text=None, bytes=None, **kwargs):
        try:
            if text:
                if multiple_chan.has_key(self.message.reply_channel.name):
                    multiple_chan[self.message.reply_channel.name].send(json.loads(text)[1])
            elif bytes:
                if multiple_chan.has_key(self.message.reply_channel.name):
                    multiple_chan[self.message.reply_channel.name].send(json.loads(bytes)[1])
        except socket.error:
            if multiple_chan.has_key(self.message.reply_channel.name):
                multiple_chan[self.message.reply_channel.name].close()
        except Exception,e:
            print e