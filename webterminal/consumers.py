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
from django.core.exceptions import ObjectDoesNotExist
from webterminal.models import ServerInfor

global multiple_chan
multiple_chan = dict()

class webterminal(WebsocketConsumer):
    
    ssh = paramiko.SSHClient() 
    
    def connect(self, message):
        message.reply_channel.send({"accept": True})     
        #permission auth

    def disconnect(self, message):
        self.message.reply_channel.send({"accept":False})
        if multiple_chan.has_key(self.message.reply_channel.name):
            multiple_chan[self.message.reply_channel.name].close()
        self.close()
    
    def receive(self,text=None, bytes=None, **kwargs):   
        try:
            if text:
                data = json.loads(text)
                if data[0] == 'ip':
                    ip = data[1]
                    self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                    try:
                        data = ServerInfor.objects.get(ip=ip)
                        port = data.credential.port
                        method = data.credential.method
                        username = data.credential.username
                        if method == 'password':
                            password = data.credential.password
                        else:
                            key = data.credential.key
                    except ObjectDoesNotExist:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server! Server ip doesn\'t exist!\033[0m'])})
                        self.message.reply_channel.send({"accept":False})                        
                    try:
                        if method == 'password':
                            self.ssh.connect(ip, port=port, username=username, password=password, timeout=3)
                        else:
                            self.ssh.connect(ip, port=port, username=username, key_filename=key, timeout=3)
                    except socket.timeout:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server time out\033[0m'])})
                        self.message.reply_channel.send({"accept":False})
                        return
                    except Exception:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mCan not connect to server\033[0m'])})
                        self.message.reply_channel.send({"accept":False})
                        return
                    
                    chan = self.ssh.invoke_shell(width=90, height=40,)
                    multiple_chan[self.message.reply_channel.name] = chan
                    interactive_shell(chan,self.message.reply_channel.name)
                    
                elif data[0] in ['stdin','stdout']:
                    if multiple_chan.has_key(self.message.reply_channel.name):
                        multiple_chan[self.message.reply_channel.name].send(json.loads(text)[1])
                    else:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mSsh session is terminate or closed!\033[0m'])})
                else:
                    self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mUnknow command found!\033[0m'])})
            elif bytes:
                if multiple_chan.has_key(self.message.reply_channel.name):
                    multiple_chan[self.message.reply_channel.name].send(json.loads(bytes)[1])
        except socket.error:
            if multiple_chan.has_key(self.message.reply_channel.name):
                multiple_chan[self.message.reply_channel.name].close()
        except Exception,e:
            import traceback
            print traceback.print_exc()