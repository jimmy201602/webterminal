# -*- coding: utf-8 -*-
import paramiko
import socket
from channels.generic.websockets import WebsocketConsumer
try:
    import simplejson as json
except ImportError:
    import json
from webterminal.interactive import interactive_shell,SshTerminalThread,InterActiveShellThread
import sys
from django.utils.encoding import smart_unicode
from django.core.exceptions import ObjectDoesNotExist,MultipleObjectsReturned
from common.models import ServerInfor,ServerGroup,CommandsSequence,Log
from webterminal.sudoterminal import ShellHandlerThread
import ast 
import time
from django.contrib.auth.models import User 
from django.utils.timezone import now
import os
from channels import Group
import traceback
from common.utils import WebsocketAuth,get_redis_instance
from permission.models import Permission
import logging
import StringIO
logger = logging.getLogger(__name__)
import uuid

class webterminal(WebsocketConsumer,WebsocketAuth):
    
    ssh = paramiko.SSHClient()
    http_user = True
    #http_user_and_session = True
    channel_session = True
    channel_session_user = True

    def connect(self, message):
        self.message.reply_channel.send({"accept": True})
        if not self.authenticate:
            self.message.reply_channel.send({"text":json.dumps({'status':False,'message':'You must login to the system!'})},immediately=True)
            self.message.reply_channel.send({"accept":False})
        else:
            #permission auth
            self.message.reply_channel.send({"text":json.dumps(['channel_name',self.message.reply_channel.name])},immediately=True)
        
    def disconnect(self, message):
        #close threading
        self.closessh()
        
        self.message.reply_channel.send({"accept":False})
        
        audit_log=Log.objects.get(user=User.objects.get(username=self.message.user),channel=self.message.reply_channel.name)
        audit_log.is_finished = True
        audit_log.end_time = now()
        audit_log.save()
        self.close()

    @property
    def queue(self):
        queue = get_redis_instance()
        channel = queue.pubsub()
        return queue
    
    def closessh(self):
        #close threading
        self.queue.publish(self.message.reply_channel.name, json.dumps(['close']))
        
    def receive(self,text=None, bytes=None, **kwargs):
        try:
            if text:
                data = json.loads(text)
                begin_time = time.time()
                if data[0] == 'ip' and len(data) == 5:
                    ip = data[1]
                    width = data[2]
                    height = data[3]
                    id = data[4]
                    self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                    try:
                        Permission.objects.get(user__username=self.message.user.username,groups__servers__ip=ip,groups__servers__id=id,groups__servers__credential__protocol__contains='ssh')
                    except ObjectDoesNotExist:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mYou have not permission to connect server {0}!\033[0m'.format(ip)])},immediately=True)
                        self.message.reply_channel.send({"accept":False})
                        return
                    except MultipleObjectsReturned:
                        pass
                    try:
                        data = ServerInfor.objects.get(ip=ip,credential__protocol__contains='ssh')
                        port = data.credential.port
                        method = data.credential.method
                        username = data.credential.username
                        audit_log = Log.objects.create(user=User.objects.get(username=self.message.user),server=data,channel=self.message.reply_channel.name,width=width,height=height)
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
                            private_key = StringIO.StringIO(key)
                            if 'RSA' in key:
                                private_key = paramiko.RSAKey.from_private_key(private_key)
                            elif 'DSA' in key:
                                private_key = paramiko.DSSKey.from_private_key(private_key)
                            elif 'EC' in key:
                                private_key = paramiko.ECDSAKey.from_private_key(private_key)
                            elif 'OPENSSH' in key:
                                private_key = paramiko.Ed25519Key.from_private_key(private_key)
                            else:
                                self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31munknown or unsupported key type, only support rsa dsa ed25519 ecdsa key type\033[0m'])},immediately=True)
                                self.message.reply_channel.send({"accept":False})
                            self.ssh.connect(ip, port=port, username=username, pkey=private_key, timeout=3)
                    except socket.timeout:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server time out\033[0m'])},immediately=True)
                        self.message.reply_channel.send({"accept":False})
                        return
                    except Exception as e:
                        self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mCan not connect to server: {0}\033[0m'.format(e)])},immediately=True)
                        self.message.reply_channel.send({"accept":False})
                        return
                    
                    chan = self.ssh.invoke_shell(width=width, height=height,)
                    
                    #open a new threading to handle ssh to avoid global variable bug
                    sshterminal=SshTerminalThread(self.message,chan)
                    sshterminal.setDaemon = True
                    sshterminal.start()     
                    
                    directory_date_time = now()
                    log_name = os.path.join('{0}-{1}-{2}'.format(directory_date_time.year,directory_date_time.month,directory_date_time.day),'{0}'.format(audit_log.log))
                    
                    #interactive_shell(chan,self.message.reply_channel.name,log_name=log_name,width=width,height=height)
                    interactivessh = InterActiveShellThread(chan,self.message.reply_channel.name,log_name=log_name,width=width,height=height)
                    interactivessh.setDaemon = True
                    interactivessh.start()
                    
                elif data[0] in ['stdin','stdout']:
                    self.queue.publish(self.message.reply_channel.name, json.loads(text)[1])
                elif data[0] == u'set_size':
                    self.queue.publish(self.message.reply_channel.name, text)
                else:
                    self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mUnknow command found!\033[0m'])},immediately=True)
            elif bytes:
                self.queue.publish(self.message.reply_channel.name, json.loads(bytes)[1])
        except socket.error:
            audit_log=Log.objects.get(user=User.objects.get(username=self.message.user),channel=self.message.reply_channel.name)
            audit_log.is_finished = True
            audit_log.end_time = now()
            audit_log.save()
            self.closessh()
            self.close()
        except Exception,e:
            logger.info(traceback.print_exc())
            self.closessh()
            self.close()


class CommandExecute(WebsocketConsumer,WebsocketAuth):
    http_user = True
    http_user_and_session = True
    channel_session = True
    channel_session_user = True   

    def connect(self, message):
        self.message.reply_channel.send({"accept": True})
        if not self.authenticate:
            self.message.reply_channel.send({"text":json.dumps({'status':False,'message':'You must login to the system!'})},immediately=True)
            self.message.reply_channel.send({"accept":False})

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
                    commandshell = ShellHandlerThread(message=self.message,commands=commands,server_list=set(server_list))
                    commandshell.setDaemon = True
                    commandshell.start()
                        
                else:
                    #illegal
                    self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mIllegal parameter passed to the server!\033[0m'])},immediately=True)
                    self.close()
            if bytes:
                data = json.loads(bytes)
        except Exception,e:
            logger.info(traceback.print_exc())
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mSome error happend, Please report it to the administrator! Error info:%s \033[0m' %(smart_unicode(e)) ] )},immediately=True)
            
class SshTerminalMonitor(WebsocketConsumer,WebsocketAuth):
    
    http_user = True
    http_user_and_session = True
    channel_session = True
    channel_session_user = True  
    
    
    def connect(self, message,channel):
        """
        User authenticate and detect user has permission to monitor user ssh action!
        """
        if not self.authenticate:
            self.message.reply_channel.send({"text":json.dumps({'status':False,'message':'You must login to the system!'})},immediately=True)
            self.message.reply_channel.send({"accept":False})
        if not self.haspermission('common.can_monitor_serverinfo'):
            self.message.reply_channel.send({"text":json.dumps({'status':False,'message':'You have not permission to monitor user ssh action!'})},immediately=True)
            self.message.reply_channel.send({"accept":False})
        self.message.reply_channel.send({"accept": True})     
        Group(channel).add(self.message.reply_channel.name)

    def disconnect(self, message,channel):
        Group(channel).discard(self.message.reply_channel.name)
        self.message.reply_channel.send({"accept":False})
        self.close()
    
    def receive(self,text=None, bytes=None, **kwargs):
        pass


class BatchCommandExecute(WebsocketConsumer,WebsocketAuth):
    http_user = True
    http_user_and_session = True
    channel_session = True
    channel_session_user = True
    ssh = paramiko.SSHClient()

    def connect(self, message):
        self.message.reply_channel.send({"accept": True})
        if not self.authenticate:
            self.message.reply_channel.send({"text":json.dumps({'status':False,'message':'You must login to the system!'})},immediately=True)
            self.message.reply_channel.send({"accept":False})

    def disconnect(self, message):
        self.message.reply_channel.send({"accept":False})
        self.close()

    @property
    def queue(self):
        queue = get_redis_instance()
        channel = queue.pubsub()
        return queue

    def receive(self,text=None, bytes=None, **kwargs):
        """
        Protocol
        register terminal id
        ["register", ip, term.cols, term.rows, serverid, element.id]
        stdin data
        ['stdin', data, element.id]
        stdout data
        ['stdout', data, element.id]
        command data
        ["command",  data, selected[i].original.elementid]
        close terminal data
        ["close",  'close', selected[i].original.elementid]
        channel_name data
        ["channel_name","channel_name",elementid]
        disconnect data
        ["disconnect",msg,elementid]
        auth data
        {'status':False,'message':'You must login to the system!'}
        """
        try:
            if text:
                data = json.loads(text)
                #print(data)
                if len(data) >0 and isinstance(data,list) and data[0] == 'register':
                    ip = data[1]
                    id = data[4]
                    channel = self.message.reply_channel.name
                    width = data[2]
                    height = data[3]
                    elementid = data[5]
                    elementid = '{0}_{1}'.format(elementid,str(uuid.uuid4()))
                    self.openterminal(ip,id,channel,width,height,elementid=elementid)
                elif len(data) >0 and isinstance(data,list) and data[0] == 'command':
                    command = data[1].strip('\n')
                    self.queue.publish(data[2], ['stdin','{0}\r'.format(command),'command'])
                elif len(data) >0 and isinstance(data,list) and data[0] == 'stdin':
                    self.queue.publish(data[2], ['stdin',data[1]])
                elif len(data) >0 and isinstance(data,list) and data[0] == 'close':
                    self.queue.publish(data[2], ['close'])
        except Exception,e:
            logger.info(traceback.print_exc())
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mSome error happend, Please report it to the administrator! Error info:%s \033[0m' %(smart_unicode(e)) ] )},immediately=True)

    def openterminal(self,ip,id,channel,width,height,elementid=None):
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        try:
            Permission.objects.get(user__username=self.message.user.username,groups__servers__ip=ip,groups__servers__id=id,groups__servers__credential__protocol__contains='ssh')
        except ObjectDoesNotExist:
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mYou have not permission to connect server {0}!\033[0m'.format(ip),elementid.rsplit('_')[0]])},immediately=True)
            self.message.reply_channel.send({"accept":False})
            return
        except MultipleObjectsReturned:
            pass
        try:
            data = ServerInfor.objects.get(ip=ip,credential__protocol__contains='ssh')
            port = data.credential.port
            method = data.credential.method
            username = data.credential.username
            audit_log = Log.objects.create(user=User.objects.get(username=self.message.user),server=data,channel=elementid,width=width,height=height)
            audit_log.save()
            if method == 'password':
                password = data.credential.password
            else:
                key = data.credential.key
        except ObjectDoesNotExist:
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server! Server ip doesn\'t exist!\033[0m',elementid.rsplit('_')[0]])},immediately=True)
            self.message.reply_channel.send({"accept":False})
        try:
            if method == 'password':
                self.ssh.connect(ip, port=port, username=username, password=password, timeout=3)
            else:
                private_key = StringIO.StringIO(key)
                if 'RSA' in key:
                    private_key = paramiko.RSAKey.from_private_key(private_key)
                elif 'DSA' in key:
                    private_key = paramiko.DSSKey.from_private_key(private_key)
                elif 'EC' in key:
                    private_key = paramiko.ECDSAKey.from_private_key(private_key)
                elif 'OPENSSH' in key:
                    private_key = paramiko.Ed25519Key.from_private_key(private_key)
                else:
                    self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31munknown or unsupported key type, only support rsa dsa ed25519 ecdsa key type\033[0m',elementid.rsplit('_')[0]])},immediately=True)
                    self.message.reply_channel.send({"accept":False})
                self.ssh.connect(ip, port=port, username=username, pkey=private_key, timeout=3)
        except socket.timeout:
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mConnect to server time out\033[0m',elementid.rsplit('_')[0]])},immediately=True)
            self.message.reply_channel.send({"accept":False})
            return
        except Exception as e:
            self.message.reply_channel.send({"text":json.dumps(['stdout','\033[1;3;31mCan not connect to server: {0}\033[0m'.format(e),elementid.rsplit('_')[0]])},immediately=True)
            self.message.reply_channel.send({"accept":False})
            return

        chan = self.ssh.invoke_shell(width=width, height=height,)

        #open a new threading to handle ssh to avoid global variable bug
        sshterminal=SshTerminalThread(self.message,chan,elementid=elementid)
        sshterminal.setDaemon = True
        sshterminal.start()

        directory_date_time = now()
        log_name = os.path.join('{0}-{1}-{2}'.format(directory_date_time.year,directory_date_time.month,directory_date_time.day),'{0}'.format(audit_log.log))

        interactivessh = InterActiveShellThread(chan,self.message.reply_channel.name,log_name=log_name,width=width,height=height,elementid=elementid)
        interactivessh.setDaemon = True
        interactivessh.start()
        self.message.reply_channel.send({"text":json.dumps(['channel_name',elementid.rsplit('_')[0],elementid.rsplit('_')[0]])},immediately=True)