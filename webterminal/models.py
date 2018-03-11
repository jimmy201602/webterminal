from django.db import models
from django.core.exceptions import ValidationError
try:
    import simplejson as json
except ImportError:
    import json
from django.contrib.auth.models import User 
import uuid
from django.utils.text import slugify

class ServerInfor(models.Model):
    name = models.CharField(max_length=40,verbose_name='Server name',blank=False,unique=True)
    hostname = models.CharField(max_length=40,verbose_name='Host name',blank=True)
    ip = models.GenericIPAddressField(protocol='ipv4',blank=False)
    createdatetime = models.DateTimeField(auto_now_add=True)
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True)
    credential = models.ForeignKey('Credential')
    
    def __unicode__(self):
        return self.name
    def gethostname(self):
        return slugify(self.hostname)

class ServerGroup(models.Model):
    name = models.CharField(max_length=40,verbose_name='Server group name',blank=False,unique=True)
    servers = models.ManyToManyField(ServerInfor,related_name='servers')
    createdatetime = models.DateTimeField(auto_now_add=True)
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True)
    
    def __unicode__(self):
        return self.name

protocol_choices = (
        ('ssh','ssh'),
        ('vnc','vnc'),
        ('rdp','rdp'),
        ('telnet','telnet')
    )

class Credential(models.Model):
    name = models.CharField(max_length=40,verbose_name='Credential name',blank=False,unique=True)
    username = models.CharField(max_length=40,verbose_name='Auth user name',blank=False)
    port = models.PositiveIntegerField(default=22,blank=False)
    method = models.CharField(max_length=40,choices=(('password','password'),('key','key')),blank=False)
    key = models.TextField(blank=True)
    password = models.CharField(max_length=40,blank=True)
    proxy = models.BooleanField(default=False)
    proxyserverip = models.GenericIPAddressField(protocol='ipv4',null=True, blank=True)
    proxyport = models.PositiveIntegerField(blank=True,null=True)
    proxypassword = models.CharField(max_length=40,verbose_name='Proxy password',blank=True)
    protocol = models.CharField(max_length=40,default='ssh', choices=protocol_choices)

    def __unicode__(self):
        return self.name    
    
    def clean(self):
        if self.protocol == 'ssh':
            if self.method == 'password' and len(self.password) == 0:
                raise ValidationError('If you choose password auth method,You must set password!')
            if self.method == 'password' and len(self.key) >0:
                raise ValidationError('If you choose password auth method,You must make key field for blank!')
            if self.method == 'key' and len(self.key) == 0:
                raise ValidationError('If you choose key auth method,You must fill in key field!')
            if self.method == 'key' and len(self.password) >0:
                raise ValidationError('If you choose key auth method,You must make password field for blank!')  
            if self.proxy:
                if self.proxyserverip is None or self.proxyport is None:
                    raise ValidationError('If you choose auth proxy,You must fill in proxyserverip and proxyport field !')

class CommandsSequence(models.Model):
    name = models.CharField(max_length=40,verbose_name='Task name',blank=False,unique=True)
    commands = models.TextField(verbose_name='Task commands',blank=False)
    group = models.ManyToManyField(ServerGroup,verbose_name='Server group you want to execute')
    
    def __unicode__(self):
        return self.name
    
    def clean(self):
        try:
            json.dumps(self.commands)
        except Exception:
            raise ValidationError('Commands sequence is not valid json type')
        
    def save(self, *args, **kwargs):
        if isinstance(self.commands,(list)):
            self.commands = json.dumps(self.commands)
        super(CommandsSequence,self).save(*args, **kwargs)

class SshLog(models.Model):
    server = models.ForeignKey(ServerInfor)
    channel = models.CharField(max_length=100,verbose_name='Channel name',blank=False,unique=True,editable=False)
    log = models.UUIDField(max_length=100,default=uuid.uuid4,verbose_name='Log name',blank=False,unique=True,editable=False)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_created=True,auto_now=True)
    is_finished = models.BooleanField(default=False)
    user = models.ForeignKey(User)
    width = models.PositiveIntegerField(default=90)
    height = models.PositiveIntegerField(default=40)
    def __unicode__(self):
        return self.server.name    