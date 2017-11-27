import paramiko
import socket
from channels.generic.websockets import WebsocketConsumer
try:
    import simplejson as json
except ImportError:
    import json
from webterminal.interactive import interactive_shell
import sys
from django.utils.encoding import smart_unicode
from django.core.exceptions import ObjectDoesNotExist
from webterminal.models import ServerInfor,ServerGroup,CommandsSequence,SshLog
from webterminal.sudoterminal import ShellHandler
import ast 
import time
from django.contrib.auth.models import User 
from django.utils.timezone import now
import os

global multiple_chan
multiple_chan = dict()
    
class webterminal(WebsocketConsumer):
    
    ssh = paramiko.SSHClient() 
    http_user = True
    http_user_and_session = True
    channel_session = True
    channel_session_user = True   
    
    def connect(self, message):
        self.message.reply_channel.send({"accept": True})     
        #permission auth

    def disconnect(self, message):
        self.message.reply_channel.send({"accept":False})
        if multiple_chan.has_key(self.message.reply_channel.name):
            multiple_chan[self.message.reply_channel.name].close()
        audit_log=SshLog.objects.get(user=User.objects.get(username=self.message.user),channel=self.message.reply_channel.name)
        audit_log.is_finished = True
        audit_log.end_time = now()
        audit_log.save()
        self.close()        
    
    def receive(self,text=None, bytes=None, **kwargs):   
        try:
            if text:
                data = json.loads(text)
                begin_time = time.time()
                if data[0] == 'ip':
                    ip = data[1]
                    self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                    try:
                        data = ServerInfor.objects.get(ip=ip)
                        port = data.credential.port
                        method = data.credential.method
                        username = data.credential.username
                        audit_log = SshLog.objects.create(user=User.objects.get(username=self.message.user),server=data,channel=self.message.reply_channel.name)
                        audit_log.save()
                        if method == 'password':
                            password = data.credential.password
                        else:
                            key = data.credential.key
                    except ObjectDoesNotExist:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server! Server ip doesn\'t exist!\033[0m'])},immediately=True)
                        self.message.reply_channel.send({"accept":False})                        
                    try:
                        if method == 'password':
                            self.ssh.connect(ip, port=port, username=username, password=password, timeout=3)
                        else:
                            self.ssh.connect(ip, port=port, username=username, key_filename=key, timeout=3)
                    except socket.timeout:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server time out\033[0m'])},immediately=True)
                        self.message.reply_channel.send({"accept":False})
                        return
                    except Exception:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mCan not connect to server\033[0m'])},immediately=True)
                        self.message.reply_channel.send({"accept":False})
                        return
                    
                    chan = self.ssh.invoke_shell(width=90, height=40,)
                    multiple_chan[self.message.reply_channel.name] = chan
                    directory_date_time = now()
                    log_name = os.path.join('{0}-{1}-{2}'.format(directory_date_time.year,directory_date_time.month,directory_date_time.day),'{0}.json'.format(audit_log.log))
                    interactive_shell(chan,self.message.reply_channel.name,log_name=log_name)
                    
                elif data[0] in ['stdin','stdout']:
                    if multiple_chan.has_key(self.message.reply_channel.name):
                        multiple_chan[self.message.reply_channel.name].send(json.loads(text)[1])                    
                    else:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mSsh session is terminate or closed!\033[0m'])},immediately=True)
                elif data[0] == u'set_size':
                    if multiple_chan.has_key(self.message.reply_channel.name):
                        multiple_chan[self.message.reply_channel.name].resize_pty(width=data[3], height=data[4])
                else:
                    self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mUnknow command found!\033[0m'])},immediately=True)
            elif bytes:
                if multiple_chan.has_key(self.message.reply_channel.name):
                    multiple_chan[self.message.reply_channel.name].send(json.loads(bytes)[1])
        except socket.error:
            if multiple_chan.has_key(self.message.reply_channel.name):
                multiple_chan[self.message.reply_channel.name].close()
                audit_log=SshLog.objects.get(user=User.objects.get(username=self.message.user),channel=self.message.reply_channel.name)
                audit_log.is_finished = True
                audit_log.end_time = now()
                audit_log.save()                
        except Exception,e:
            import traceback
            print traceback.print_exc()


class CommandExecute(WebsocketConsumer):
    http_user = True
    http_user_and_session = True
    channel_session = True
    channel_session_user = True   
    
    def connect(self, message):
        self.message.reply_channel.send({"accept": True})     
        #permission auth

    def disconnect(self, message):
        self.message.reply_channel.send({"accept":False})
        self.close()
    
    def receive(self,text=None, bytes=None, **kwargs):
        try:
            if text:
                data = json.loads(text)
                if isinstance(data,list):
                    return
                if data.has_key('parameter'):
                    parameter = data['parameter']
                    taskname = parameter.get('taskname',None)
                    groupname = parameter.get('groupname',None)
                    ip = parameter.get('ip',None)
                    if taskname and ip and groupname:
                        server_list = [ ip ]
                    elif taskname and not ip and not groupname:
                        server_list = []
                        [server_list.extend([ server.ip for server in ServerGroup.objects.get(name=group.name).servers.all() ]) for group in CommandsSequence.objects.get(name = taskname).group.all() ]
                    elif taskname and groupname and not ip:
                        server_list = [ server.ip for server in ServerGroup.objects.get(name=groupname).servers.all() ]
                    commands = json.loads(CommandsSequence.objects.get(name = taskname).commands)
                    if isinstance(commands,(basestring,str,unicode)):
                        commands = ast.literal_eval(commands)
                    #Run commands 
                    for server_ip in server_list:
                        
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mExecute task on server:%s \033[0m' %(smart_unicode(server_ip)) ] )},immediately=True)
                        
                        #get server credential info
                        serverdata = ServerInfor.objects.get(ip=server_ip)
                        port = serverdata.credential.port
                        method = serverdata.credential.method
                        username = serverdata.credential.username
                        if method == 'password':
                            credential = serverdata.credential.password
                        else:
                            credential = serverdata.credential.key     
                        
                        
                        #do actual job    
                        ssh = ShellHandler(server_ip,username,port,method,credential,channel_name=self.message.reply_channel.name)
                        for command in commands:
                            ssh.execute(command)
                        del ssh
                        
                else:
                    #illegal
                    self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mIllegal parameter passed to the server!\033[0m'])},immediately=True)
                    self.close()
            if bytes:
                data = json.loads(bytes)
        except Exception,e:
            import traceback
            print traceback.print_exc()
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mSome error happend, Please report it to the administrator! Error info:%s \033[0m' %(smart_unicode(e)) ] )},immediately=True)